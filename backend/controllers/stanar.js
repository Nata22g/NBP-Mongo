import express from "express";
const router = express.Router();
import Upravnik from "../models/Upravnik.js"
import Stanar from "../models/Stanar.js"
import Direktor from "../models/Direktor.js"
import Kvar from "../models/Kvar.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Zgrada from "../models/Zgrada.js";

import registrovaniKorisnik, { azurirajNalogRegKor } from "../controllers/registrovaniKorisnik.js" //sta ce nam ovo?

import { generateAccessToken } from "../auth.js"; //ni ova dva nam ne trebaju
import { generateRefreshToken } from "../auth.js";

export const dodajStanara = async(req, res)=>{
    try
    {
        //const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const zgrada = await Zgrada.findOne({lokacija: req.body.zgrada})

        // i ne treba ovo al neka ga
        if( req.body.brStana > zgrada.brStanova){
            return res.status(400).json("Broj stanova u zgradi je " + zgrada.brStanova)
        }
        
        const check = await Stanar.find({ username: req.body.username});
        if (check.length == 0){


            const kor = new RegistrovaniKorisnik({
                ime: req.body.ime,
                prezime: req.body.prezime,
                username: req.body.username,
                password: req.body.password,
                tipKorisnika: "Stanar"
            });

            const user = await kor.save();

            const stanar = new Stanar({
                registrovaniKorisnikId: user._id,
                brStana: req.body.brStana,
                zgrada: req.body.zgrada,
                brojUkucana: req.body.brojUkucana,
                //upravnikId: req.params.id  //ne ovako
            })

            const noviStanar = await stanar.save();
            //console.log(noviStanar)
            //console.log(zgrada)
            await Stanar.findByIdAndUpdate(noviStanar._id, {upravnikId: zgrada.upravnikId})

            //const token = generateAccessToken(noviStanar.registrovaniKorisnikId)
            //const refreshToken = generateRefreshToken(noviStanar.registrovaniKorisnikId)


            const zgr = await Zgrada.findOne({'lokacija': noviStanar.zgrada});
            await Zgrada.findByIdAndUpdate(zgr._id, {$push:{ stanari: noviStanar } })

            return res.status(200).json("Uspešno ste dodali stanara");
        }
        else{
            return res.status(400).json("Već postoji stanar sa ovim username-om")
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

//izmeni podatke
export const azurirajNalogStanar = async (req, res) => {
    if (req.body.registrovaniKorisnikId == req.params.id) {
        const regKor = await RegistrovaniKorisnik.findById(req.params.id)
        if(req.body.password == regKor.password)
        {
          // if (req.body.password) {
          //   try 
          //   {
          //     const salt = await bcrypt.genSalt(10);
          //     req.body.password = await bcrypt.hash(req.body.password, salt);
          //   }
          //   catch (err) 
          //   {
          //     return res.status(500).json(err);
          //   }
          // }
            try 
            {
                const stan = await Stanar.findOne({registrovaniKorisnikId: req.params.id})
                const user = await Stanar.findByIdAndUpdate(stan._id, {
                $set: { brojUkucana: req.body.brojUkucana }
                });
                res.status(200).json("Nalog je ažuriran!");
            }
            catch (err) 
            {
                return res.status(500).json(err);
            }
        }
        else {
          return res.status(401).json("Netačna lozinka")
        }
    }
    else {
        return res.status(403).json("Možete da izmenite samo svoj nalog");
    }
}

//upravnik briše stanara
export const obrisiStanara = async (req, res) => {

    try {

        //const upravnik = await RegistrovaniKorisnik.findById(req.params.upravnikId)

        const stanar = await Stanar.findById(req.params.id)
        if (stanar != null) 
        {
            const zgrada= await Zgrada.findOne({'lokacija': stanar.zgrada});
            await zgrada.updateOne({$pull: { stanari: {_id: stanar._id}}});
            let kvar;
            let sar;
            let upr = await Upravnik.findById(zgrada.upravnikId);
            let dir = await Direktor.findById(upr.direktorId);

            for (let i=0; i< stanar.kvarovi.length; i++)
            {
                kvar = await Kvar.findById(stanar.kvarovi[i]._id)
                if(kvar.status == "Prosleđen direktoru")
                {
                    dir.updateOne({$pull: {prihvaceniKvarovi: {_id: kvar._id}}})
                }
                else if(kvar.status == "Prosleđen saradniku" || "Popravka je u toku")
                {
                    sar = await Saradnik.findById(kvar.saradnikId);
                    sar.updateOne({$pull: {dobijeniKvarovi: {_id: kvar._id}}})
                }
                await Kvar.findByIdAndDelete(stanar.kvarovi[i]._id);
            }
            
            
            await RegistrovaniKorisnik.findByIdAndDelete(stanar.registrovaniKorisnikId)
            await Stanar.findByIdAndDelete(stanar._id)
            
            return res.status(200).json("Uspešno obrisan stanar");

            //}
            //else { return res.status(400).json("Ovaj stanar nije u vašoj nadležnosti");}

        }
        else {
            return res.status(404).json("Stanar nije pronađen")
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

export default router;