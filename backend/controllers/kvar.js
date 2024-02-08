import express from "express";
const router = express.Router();
import Kvar from "../models/Kvar.js"
import Stanar from "../models/Stanar.js";
import Zgrada from "../models/Zgrada.js";
import Direktor from "../models/Direktor.js";
import Upravnik from "../models/Upravnik.js";
import { ObjectId } from "mongodb";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";


export const prikaziSveKvaroveStanar = async(req, res) => {
   try
   {
        const stanar = await Stanar.findOne({_id: req.params.id});
        const kvarovi = await Kvar.find({stanarId: stanar._id} );
        if(kvarovi.length > 0)
        {
            //console.log(stanar.kvarovi);
            let vrati= [];
            for (let i=0; i< kvarovi.length; i++)
            {
                let k ={
                    naslov: kvarovi[i].naslov,
                    opis: kvarovi[i].opis,
                    status: kvarovi[i].status,
                    urgentnost: kvarovi[i].urgentnost

                }
                vrati.push(k);           
            }
            if(vrati.length > 0)
            {
                return res.status(200).json(vrati);
            }
        }
        else
        {
            return res.status(404).json("Nemate nijedan prijavljen kvar")
        }
   }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const prikaziSveKvaroveUpravnik = async(req, res) => { 
    try 
    {
        const upravnik = await Upravnik.findById(req.params.upravnikId);
        //console.log(upravnik);
        let zgrada = await Zgrada.findById(req.params.zgradaId);
        console.log(zgrada);
        let kvarovi = [];
        
        kvarovi = await Kvar.find({zgradaLokacija: zgrada.lokacija});
        //console.log(kvarovi);
           
        console.log(kvarovi.length)
        if(kvarovi.length > 0)
        {
            //console.log("uslo u if")
            let vrati = [];
            for (let i = 0; i < kvarovi.length; i++)
            {
                if(kvarovi[i].status == "Prijavljen")
                {
                    let kvar = {
                        urgentnost: kvarovi[i].urgentnost,
                        naslov: kvarovi[i].naslov,
                        opis: kvarovi[i].opis,
                        zgradaLokacija: kvarovi[i].zgradaLokacija,
                        stan: kvarovi[i].stan,
                        status: kvarovi[i].status,
                        kvarId: kvarovi[i]._id
                    }
                    console.log(kvar);
                    vrati.push(kvar);
                }
            }
            if(vrati.length > 0)
            {
                return res.status(200).json(vrati);
            }
            else
            {
                return res.status(404).json("Nema nijednog prijavljenog kvara")
            }
        }
        else
        {
            return res.status(400).json("Nema nijednog prijavljenog problema!");
        }
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const prikaziSveKvaroveDirektor = async(req, res) => {
    try 
    {
        const dir = await Direktor.findById(req.params.id); //pošto postoji samo jedan direktor nema provere njegovog id-a
        console.log(dir);
        let kvarovi = [];
        
        kvarovi = await Kvar.find({'status': "Prosleđen direktoru"});
        console.log(kvarovi);

        if(kvarovi.length)
        {
            console.log("uslo u if")
            let vrati = [];
            for (let i=0; i<kvarovi.length; i++)
            {
                console.log("uslo u for")

                console.log(kvarovi[i].upravnikId)
                const upravnik = await Upravnik.findById(kvarovi[i].upravnikId);
                console.log(upravnik)
                const regKorUpr = await RegistrovaniKorisnik.findById(upravnik.registrovaniKorisnikId);
                //console.log(regKorUpr)

                let kvar = {
                    urgentnost: kvarovi[i].urgentnost,
                    naslov: kvarovi[i]. naslov,
                    opis: kvarovi[i]. opis,
                    upravnikId: kvarovi[i].upravnikId,
                    zgrada: kvarovi[i].zgradaLokacija,
                    stan: kvarovi[i].stan,
                    upravnik: regKorUpr.ime + " " + regKorUpr.prezime,
                    kvarId: kvarovi[i]._id
                }
                vrati.push(kvar);
            }

            return res.status(200).json(vrati);      
        }
        else{
            return res.status(400).json("Nema nijednog prijavljenog problema!");
        }

    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const prijaviKvar = async(req, res) => {
    try {

        let stanar = await Stanar.findById(req.params.id);
        //console.log(stanar);
        let zgradaKvara = await Zgrada.findOne({'lokacija': stanar.zgrada});
        //console.log(zgradaKvara);
        //console.log(stanar.upravnikId)

        let kvar = new Kvar({
             
            //upravnikId: stanar.upravnikId, //nema ovo u bazi
            stanarId : stanar._id,
            status: "Prijavljen",
            urgentnost: req.body.urgentnost,
            naslov: req.body.naslov,
            opis: req.body.opis,
            zgradaLokacija: zgradaKvara.lokacija,
            stan: stanar.brStana
        })
        //console.log(kvar);

        await kvar.save();

        await Kvar.findByIdAndUpdate(kvar._id, {upravnikId: stanar.upravnikId})

        stanar.kvarovi.push(kvar);
        zgradaKvara.kvarovi.push(kvar);
        await stanar.save();
        await zgradaKvara.save();

        // await stanar.updateOne({ $push: { kvarovi: kvarSave} });
        // await zgradaKvara.updateOne({ $push: { kvarovi: kvarSave} });

        return res.status(200).json("Vaš kvar je zabeležen i prosleđen upravniku");
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export const proslediKvarDirektoru = async (req, res)=> {

    try 
    {
        let kvar = await Kvar.findById(req.params.id); 
        //console.log(kvar);
        const upravnik = await Upravnik.findById(kvar.upravnikId);
        const zgrada = await Zgrada.findOne({lokacija: kvar.zgradaLokacija})
        //console.log(upravnik);
        let direktor = await Direktor.findById(upravnik.direktorId);  //je l mi treba ovo

        await kvar.updateOne({ $set: {'status': "Prosleđen direktoru"} });
        await direktor.updateOne({ $push : {prihvaceniKvarovi: kvar} });   //i ovo
        await zgrada.updateOne({ $set: {'status': "Prosleđen direktoru"} });
        


        res.status(200).json("Problem je prosleđen direktoru!");
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }

}

export const odbijKvarUpravnik = async(req, res)=>{
    try
    {
        let kvar = await Kvar.findById(req.params.id);

        await kvar.updateOne({$set: {'status': "Odbijen"} });

        res.status(200).json("Problem odbijen!");
    }
    catch (err)
    {
        return res.status(500).json(err);
    }
}

export default router;