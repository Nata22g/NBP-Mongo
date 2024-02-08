import express from "express";
const router = express.Router();

import Obavestenje from "../models/Obavestenje.js";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";
import Stanar from "../models/Stanar.js";
import Upravnik from "../models/Upravnik.js";
import Zgrada from "../models/Zgrada.js";


//dodaj obaveštenje

export const dodajObavestenjeUpravnik = async(req, res)=> {
    try
    {
        const upravnik = await Upravnik.findById(req.params.upravnikId) 
        //njemu treba da se izlistaju samo one zgrade kojima upravlja

        const zgr = await Zgrada.findById(req.params.zgradaId);
        const regKorUpr = await RegistrovaniKorisnik.findById(upravnik.registrovaniKorisnikId);

        const obav = new Obavestenje({
            autorId: upravnik._id, //ILI req.params.upravnikId
            ime: regKorUpr.ime,
            prezime: regKorUpr.prezime,
            naslov: req.body.naslov,
            opis: req.body.opis,
            datum: new Date(), //.now?
            zgrada: zgr._id    //ILI req.params.zgradaId
        })
        

        const obavSave= await obav.save();
        await zgr.updateOne({ $push: { obavestenja: obavSave} });      
        return res.status(200).json("Uspešno ste postavili obaveštenje!");
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
    
}

export const dodajObavestenjeStanar = async(req, res)=> {
    try
    {
        const stanar = await Stanar.findById(req.params.id);
        //console.log(stanar);
        const zgr = await Zgrada.findOne({lokacija: stanar.zgrada});
        
        const regKorUpr = await RegistrovaniKorisnik.findById(stanar.registrovaniKorisnikId);
        console.log(regKorUpr);
        const obav = new Obavestenje({
            autorId: req.params.id,
            naslov: req.body.naslov,
            opis: req.body.opis,
            ime: regKorUpr.ime,
            prezime: regKorUpr.prezime,
            datum: new Date(),
            zgrada: zgr._id
        })
        //console.log(obav);
        const obavSave= await obav.save();
        await zgr.updateOne({ $push: { obavestenja: obavSave} });
        return res.status(200).json("Uspešno ste postavili obaveštenje!");

    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

//obriši obaveštenje
export const obrisiObavestenjeUpravnik = async(req, res)=> {
    try
    {
        const obav = await Obavestenje.findById(req.params.obavestenjeId);
        const brisacId = req.params.upravnikId;

        if (obav.autorId == brisacId)
        {
            
            const zgr= await Zgrada.findById(obav.zgrada)
            await zgr.updateOne({$pull:{obavestenja: {_id: obav._id }  }  });
            await Obavestenje.findByIdAndDelete(obav._id);
            return res.status(200).json("Uspešno ste obrisali svoje obaveštenje!");
        }
        else
        {
            return res.status(500).json("Možete obrisati samo svoje obaveštenje.");
        }
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const obrisiObavestenjeStanar = async(req, res)=> {
    try
    {
        const obav = await Obavestenje.findById(req.params.obavestenjeId);
        const brisacId = req.params.stanarId;

        if (obav.autorId == brisacId)
        {
            const zgr = await Zgrada.findById(obav.zgrada);

            await zgr.updateOne({ $pull: {obavestenja: {_id: obav._id} } })
            //console.log(zgr)

            await Obavestenje.findByIdAndDelete(obav._id);
            return res.status(200).json("Uspešno ste obrisali svoje obaveštenje!");
        }
        else
        {
            return res.status(500).json("Možete obrisati samo svoje obaveštenje.");
        }
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

//prikazi obaveštenja
export const prikaziSvaObavestenjaUpravnik = async(req, res) => {
    try 
    {   
        const svaObav = await Obavestenje.find({ 'zgrada': req.params.zgradaId });
        //console.log(svaObav)

        if(svaObav.length > 0)
        {
            const danas= new Date();
            let vrati = [];
            for (let i=0; i< svaObav.length; i++)
            {
                let timeDifference = svaObav[i].datum.getTime() - danas.getTime();
                let daysDifference = timeDifference/ (1000* 60* 60* 24);

                let date_time = svaObav[i].datum;
                let day = ("0" + date_time.getDate()).slice(-2);
                let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
                let year = date_time.getFullYear();

                if(daysDifference < 30)
                {
                        let obav = {
                            ime: svaObav[i].ime,
                            prezime: svaObav[i].prezime,
                            naslov: svaObav[i]. naslov,
                            opis: svaObav[i]. opis,
                            datum: year + "-" + month + "-" + day,
                            obavestenjeId: svaObav[i]._id,
                            tipAutora: svaObav[i].tipAutora,
                            autorId: svaObav[i].autorId
                        }
                        
                        vrati.push(obav);
                }
                //console.log(vrati)
            }
            //console.log("ćao")
            return res.status(200).json(vrati);      
        }
        else
        {
            return res.status(400).json("Nema nijednog obaveštenja");
        }
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export const prikaziSvaObavestenjaStanar = async(req, res) => {
    try 
    {
        const stanar = await Stanar.findById(req.params.id);
        //const autor = await RegistrovaniKorisnik.findOne({_id: stanar.registrovaniKorisnikId}); 
        const zgr = await Zgrada.findOne({lokacija: stanar.zgrada});
        
        const svaObav = await Obavestenje.find({ zgrada: zgr._id });

        if(svaObav.length >0)
        {
            const danas= new Date();
            let vrati = [];

            for (let i=0; i < svaObav.length; i++)
            {
                let timeDifference = svaObav[i].datum.getTime() - danas.getTime();
                let daysDifference = timeDifference/ (1000* 60* 60* 24);

                let date_time = svaObav[i].datum;
                let day = ("0" + date_time.getDate()).slice(-2);
                let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
                let year = date_time.getFullYear();

                if(daysDifference <= 30)
                {
                    let obav = {
                        ime: svaObav[i].ime,
                        prezime: svaObav[i].prezime,
                        naslov: svaObav[i]. naslov,
                        opis: svaObav[i]. opis,
                        datum: year + "-" + month + "-" + day,
                        obavestenjeId: svaObav[i]._id,
                        tipAutora: svaObav[i].tipAutora,
                        autorId: svaObav[i].autorId
                    }
                    
                    vrati.push(obav);
                }
            }
            return res.status(200).json(vrati); 
        }
        else
        {
            return res.status(400).json("Nema nijednog obaveštenja");
        }
        
    }
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

export default router;