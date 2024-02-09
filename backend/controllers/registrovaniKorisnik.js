// const router = require("express").Router();
// const bcrypt = require("bcrypt");
//const User = require("../models/RegistrovaniKorisnik.js");

import express from "express";
const router = express.Router();
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";

//update your acc
export const azurirajNalogRegKor = async (req, res, next) => {

    if (req.body.registrovaniKorisnikId == req.params.id) {
        const regKor = await RegistrovaniKorisnik.findById(req.params.id);
        if (req.body.password == regKor.password) 
        {
            try 
            {
                const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.params.id, {
                                                                        $set: { ime: req.body. ime,
                                                                                prezime: req.body.prezime }});
                                                                                
                //console.log("id: " + req.params.id + "body " + req.body.registrovaniKorisnikId)
                return next();
                // return res.status(200).json("Uspešno ažuriran profil")
            }
            catch (err) 
            {
                return res.status(500).json(err);
            }
        }
        else{
            return res.status(400).json("Netačna lozinka!")
        if(regKor){
            if (req.body.password == regKor.password) 
            {
                try 
                {
                    console.log("tu sam")
                    //const salt = await bcrypt.genSalt(10);
                    //req.body.password = await bcrypt.hash(req.body.password, salt);
                }
                catch (err) 
                {
                    return res.status(500).json(err);
                }
                
                try 
                {
                    const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.params.id, {
                                                                            $set: { ime: req.body. ime,
                                                                                    prezime: req.body.prezime }});
                                                                                    
                    console.log("id: " + req.params.id + "body " + req.body.registrovaniKorisnikId)
                    return next();
                    // return res.status(200).json("Uspešno ažuriran profil")
                }
                catch (err) 
                {
                    return res.status(500).json(err);
                }
            }
            else{
                return res.status(400).json("Netačna lozinka!")
            }
        } else{
            return res.status(404).json("Nije pronađen odgovarajući registrovani korisnik")
        }
    }
    else {
      return res.status(403).json("Možete da izmenite samo svoj nalog");
    }
  };

  export default router;