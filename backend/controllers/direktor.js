import express from "express";
const router = express.Router();
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";
import Direktor from "../models/Direktor.js";
//import { ObjectId } from "mongodb";

export const azurirajNalogDirektor = async (req, res) => { //email i tel

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
                const dir = await Direktor.findOne({registrovaniKorisnikId: req.params.id})
                const user = await Direktor.findByIdAndUpdate(dir._id, {
                $set: { email: req.body.email,
                        telefon: req.body.telefon},
                });
                return res.status(200).json("Nalog je ažuriran!");
            }
            catch (err) 
            {
                return res.status(500).json(err);
            }
        }
        else
        {
            return res.status(401).json("Netačna lozinka")
        }
    }
    else {
        return res.status(403).json("Možete da izmenite samo svoj nalog");
    }
};

export default router;