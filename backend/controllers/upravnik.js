import express from "express";
const router = express.Router();
import Upravnik from "../models/Upravnik.js"
import Direktor from "../models/Direktor.js"
import Stanar from "../models/Stanar.js"
import Zgrada from "../models/Zgrada.js"
import Kvar from "../models/Kvar.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Obavestenje from "../models/Obavestenje.js"
import Anketa from "../models/Anketa.js"
import { generateAccessToken } from "../auth.js";
import { generateRefreshToken } from "../auth.js";

export const dodajUpravnika = async(req, res) => {
    try {
        const direktor = await Direktor.findById(req.params.id);

        //const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(req.body.password, salt);


        const check = await Upravnik.find({where: {username: req.body.username} });
        if (check.length == 0){

            const kor = new RegistrovaniKorisnik({
                ime: req.body.ime,
                prezime: req.body.prezime,
                username: req.body.username,
                password: req.body.password,
                tipKorisnika: "Upravnik"
            });

            const user = await kor.save();
            const zgr = await Zgrada.findOne({ lokacija: req.body.lokacija});

            const upravnik = new Upravnik({
                registrovaniKorisnikId: user._id,
                telefon: req.body.telefon,
                email: req.body.email,
                direktorId: req.params.id   })

            const noviUpravnik = await upravnik.save();

            await zgr.updateOne( {upravnikId: noviUpravnik._id} );
            await noviUpravnik.updateOne({ $push: { zgrade: zgr } });
            await direktor.updateOne({ $push: { upravnici: noviUpravnik} });
            let stanari = await Stanar.find({zgrada: zgr.lokacija})
            for(let i = 0; i < stanari.length; i++)
            {
                await stanari[i].updateOne({upravnikId: noviUpravnik._id})
            }
            // zgr.stanari.forEach(stan => {
            //     stan.updateOne({upravnikId: noviUpravnik._id})
            // });


            return res.status(200).json("Uspešno dodat upravnik");
        }
        else {
            return res.status(400).json("Već postoji upravnik sa tim username-om");
        }

    }
    catch(err) {
        return res.status(500).json(err);
    }
}

export const vidiSveUpravnike = async(req, res) =>
{
    try
    {
        const upravnik = await Upravnik.find();
        //res.status(200).json(upravnik)

        if (upravnik.length != 0) {
            let upravnici = []
            for (let i = 0; i < upravnik.length; i++) {
                const t = await RegistrovaniKorisnik.findById(upravnik[i].registrovaniKorisnikId)

                const brojZgr= await Zgrada.find({upravnikId: upravnik[i]._id})
                let upr = {
                    ime: t?.ime,        
                    prezime: t?.prezime,
                    telefon: upravnik[i].telefon,
                    email: upravnik[i].email, 
                    brojZgrada: brojZgr.length, //upravnik[i].zgrade.length,
                    upravnikId: upravnik[i]._id
                 }


                upravnici.push(upr)
                //res.status(200).json(upravnici)
            }
            return res.status(200).json(upravnici);
        }

        else {
            return res.status(404).json("Nema upravnika za prikaz")
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

export const obrisiUpravnika = async(req, res) =>
{
    try
    {
        const upravnik=await Upravnik.findById(req.params.idUpr)
        if(upravnik != null)
        {
            //res.status(200).json(upravnik)
            let zgrade = await Zgrada.find({upravnikId: upravnik._id})
            let kvarovi = await Kvar.find({upravnikId: upravnik._id})
            let obavestenja = await Obavestenje.find({autorId: upravnik._id})
            let ankete = await Anketa.find({upravnikId: upravnik._id})
            let stanari = [];
            //console.log(zgrade);
            if(zgrade.length > 0)
            {
                console.log("uslo u if");
                for(let i = 0; i < zgrade.length; i++)
                {
                    console.log("uslo u prvi for");
                    await zgrade[i].updateOne({upravnikId: upravnik.direktorId});
                    stanari = await Stanar.find({zgrada: zgrade[i].lokacija});
                    for(let j = 0; j < stanari.length; j++)
                    {
                        console.log("uslo u drugi for");
                        await stanari[j].updateOne({upravnikId: upravnik.direktorId})
                    }
                }
                // zgrade.forEach(z => {
                //     z.updateOne({upravnikId: upravnik.direktorId})
                //     const stanari = Stanar.find({zgrada: z.lokacija})
                //     stanari.forEach(s => {
                //         s.updateOne({upravnikId: upravnik.direktorId})
                //     });
                // });
            }
            if(kvarovi.length > 0)
            {
                console.log("uslo u drugi if")
                for(let i = 0; i < kvarovi.length; i++)
                {
                    console.log("uslo u drugi for")
                    await kvarovi[i].updateOne({upravnikId: upravnik.direktorId})
                }
            }
            if(obavestenja.length > 0)
            {
                for(let i = 0; i < obavestenja.length; i++)
                {
                    await Obavestenje.findByIdAndDelete(obavestenja[i]._id)
                }
            }
            if(ankete.length > 0)
            {
                for(let i = 0; i < ankete.length; i++)
                {
                    await Anketa.findByIdAndDelete(ankete[i]._id)
                }
            }
            await Direktor.findByIdAndUpdate(upravnik.direktorId, {$pull: {upravnici: { _id: upravnik._id} }});
            await RegistrovaniKorisnik.findByIdAndDelete(upravnik.registrovaniKorisnikId)
            await Upravnik.findByIdAndDelete(upravnik._id)

            return res.status(200).json("Nalog upravnika je obrisan");
        }
        else
        {
            return res.status(404).json("Nema upravnika sa tim ID-em")
        }
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

export const azurirajNalogUpravnik = async (req, res) => {

    try
    {
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
                    const upr = await Upravnik.findOne({registrovaniKorisnikId: req.params.id})
                    const user = await Upravnik.findByIdAndUpdate(upr._id, {
                    $set: { email: req.body.email,
                                telefon: req.body.telefon }
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
    catch(err)
    {
        return res.status(500).json(err);
    }
}

export const naplatiDugovanjeStanarima = async(req, res)=>{
    try
    {
        
        const zgrada = await Zgrada.findById(req.params.zgradaId);

        if(zgrada.stanari.length != 0)
        {
            let stanar;
            for(let i = 0; i < zgrada.stanari.length; i++)
            {
                stanar = await Stanar.findById(zgrada.stanari[i]._id);
                stanar.dugovanje = stanar.dugovanje + stanar.brojUkucana * req.body.racun;
                stanar.save();
            }
            return res.status(200).json("Naplaćeno");
        }
        else
        {
            return res.status(404).json("Nema stanara u odabranoj zgradi");
        }
        
        // let stanari = await Stanar.find( {where: { zgrada: zgrada.lokacija }} );

        // if (stanari.length != 0)
        // {
        //     for (let i=0; i < stanari.length; i++)
        //     {
        //         stanari[i]. dugovanje= (stanari[i].dugovanje + req.body.racun);
        //     }
        //     return res.status(200).json("Naplaćeno")
        // }
        // else
        // {
        //     return res.status(500).json("Nema stanara u odabranoj zgradi");

        // }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export default router;