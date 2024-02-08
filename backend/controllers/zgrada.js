import express from "express";
const router = express.Router();
import Stanar from "../models/Stanar.js";
import Kvar from "../models/Kvar.js";
import Zgrada from "../models/Zgrada.js"
import Upravnik from "../models/Upravnik.js";
import Direktor from "../models/Direktor.js";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";

export const dodajZgradu = async(req, res)=>{
    try
    {
        const check = await Zgrada.find({lokacija: req.body.lokacija} );
        console.log(check)
        if(check.length == 0)
        {
            const zgr = new Zgrada({
                brStanova: req.body.brStanova,
                lokacija: req.body.lokacija,
                upravnikId: req.params.id,
                //slika: req.body.lokacija + ".jpg"
            })
            console.log(zgr)
            const zgrSave= await zgr.save();
            return res.status(200).json("Uspešno ste dodali zgradu");
        }
        else
        {
            return res.status(400).json("Izabrana zgrada je već dodata");
        }
    
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}  

//prikaži stanare
export const prikaziSveStanareZgrade = async(req, res)=>{
    try
    {
        const zgrada = await Zgrada.findById(req.params.zgradaId);      
    
        const stanari = await Stanar.find({ zgrada: zgrada.lokacija});        
        if (stanari.length != 0) 
        {
            let vrati = []
            for (let i = 0; i < stanari.length; i++) 
            {
                let regKorisnik = await RegistrovaniKorisnik.findById(stanari[i].registrovaniKorisnikId)
                if(regKorisnik != null)
                {
                    let stanar = 
                    {
                        stanarId: stanari[i]._id,
                        ime: regKorisnik.ime,
                        prezime: regKorisnik.prezime,
                        brStana: stanari[i].brStana,
                        brojUkucana: stanari[i].brojUkucana,
                        dugovanja: stanari[i].dugovanje
                    }
                    vrati.push(stanar)
                }
            
            }
            return res.status(200).json(vrati)
        }
        else 
        { 
            return res.status(404).json("Nema stanara u ovoj zgradi"); 
        }
                  
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

//pregled zgrada
export const prikaziZgradeUpravnika = async(req, res)=>{
    try
    {
        const upravnik = await Upravnik.findById(req.params.id);

        const zgrade = await Zgrada.find( {upravnikId: upravnik._id});
        const regUpr = await RegistrovaniKorisnik.findById(upravnik.registrovaniKorisnikId);

        if (zgrade != 0) 
        {
            let vrati = []
            for (let i = 0; i < zgrade.length; i++) 
            {
                let zgr = 
                {
                    zgradaId: zgrade[i]._id,
                    lokacija: zgrade[i].lokacija,
                    brStanova: zgrade[i].brStanova,
                    upravnik: regUpr.ime + " " + regUpr.prezime
                    //kvarovi, obaveštenja, stanovi
                }
                vrati.push(zgr)
            }
            return res.status(200).json(vrati)
        }
        else 
        { 
            return res.status(404).json("Ovaj upravnik nema nijednu zgradu");
        }
    }
    
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

//ovo je za direktora
export const prikaziSveZgrade= async(req, res)=> {
    try
    {
        const zgrade = await Zgrada.find();
        if (zgrade.length != 0) 
        {
            let vrati = []
            for (let i = 0; i < zgrade.length; i++) 
            {
                //zato što nemaju sve zgrade upravnika

                //const upravnik = await Upravnik.findById(zgrade[i].upravnikId);
                //const regUpr = await RegistrovaniKorisnik.findById(upravnik.registrovaniKorisnikId);

                let zgr = 
                {
                    lokacija: zgrade[i].lokacija,
                    brStanova: zgrade[i].brStanova,
                    //upravnik: regUpr?.ime + " " + regUpr?.prezime
                    //kvarovi, obaveštenja, stanovi
                        
                }
                vrati.push(zgr)
            }
            return res.status(200).json(vrati)
            }
            
        
        else { 
            return res.status(404).json("Nema nijedne zgrade u sistemu"); 
        }
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }

}

export const prikaziZgradeBezUpravnika = async(req, res)=> {
    try
    {
        //console.log("ćao")
        //const dir = await Direktor.findById(req.params.id);
        //console.log(req.params.id);
        let zgrade= [];
        zgrade = await Zgrada.find({ 'upravnikId' : req.params.id} );
        console.log(zgrade.length)
        if(zgrade.length > 0)
        {
            let vrati = [];
            for(let i = 0; i < zgrade.length; i++)
            {
                //console.log("evo me")
                let z = {
                    lokacija: zgrade[i].lokacija,
                    brStanova: zgrade[i].brStanova
                    }
                //console.log(z)
                vrati.push(z);
            
            }
       
            return res.status(200).json(vrati)
        }
        else
        {
            return res.status(404).json("Nema zgrada bez upravnika");
        }

    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const dodeliZgraduUpravniku = async(req, res)=> {
    try
    {
        let zgrada = await Zgrada.findById(req.params.zgradaId);
        //console.log(zgrada)
        let upravnik = await Upravnik.findById(req.params.upravnikId);
        //console.log(upravnik)
        
        await zgrada.updateOne({upravnikId: upravnik._id});
        await upravnik.updateOne({ $push: {zgrade: zgrada} });
        let stanar
        let kvar

        for (let i = 0; i < zgrada.stanari.length; i++)
        {
            stanar = await Stanar.findById(zgrada.stanari[i]._id);
            //console.log(stanar)
            await stanar.updateOne({upravnikId: upravnik._id});
        }

        for (let i = 0; i < zgrada.kvarovi.length; i++)
        {
            kvar = await Kvar.findById(zgrada.kvarovi[i]._id);
            //console.log(stanar)
            await kvar.updateOne({upravnikId: upravnik._id});
        }

        return res.status(200).json("Uspešno ste dodelili zgradu upravniku");
        
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const PrikaziSlobodneStanoveZgrade = async(req, res)=> {
    try 
    {
        const zgr = await Zgrada.findById(req.params.id);
        const brStanova = zgr.brStanova;
        let vrati= [];
        let flag = false;
        let stanovi= [];

        for (let i = 0; i < zgr.stanari.length; i++)
        {
            stanovi.push(zgr.stanari[i].brStana);
        }
        //console.log(stanovi)

        for (let i = 1; i < brStanova+1; i++)
        {
            let j=0;
            flag = false;
            while (j < stanovi.length && !flag)
            {
                if(stanovi[j] == i)
                {
                    flag= true;
                }
                j++;
            }
            
            if(!flag)
            {
                vrati.push(i)  //stanovi[i]
            }
        }
        if(vrati.length > 0)
            return res.status(200).json(vrati);
        else
            return res.status(404).json("Nema slobodnih stanova u ovoj zgradi")
        
    }
    catch
    {
        return res.status(500).json(err);
    }
}


export default router;