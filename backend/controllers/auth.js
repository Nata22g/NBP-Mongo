import express from "express";
const router = express.Router();
import jwt from 'jsonwebtoken';
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js";
import Stanar from "../models/Stanar.js";
import Upravnik from "../models/Upravnik.js";
import Direktor from "../models/Direktor.js";
import { generateAccessToken } from "../auth.js";
import { generateRefreshToken } from "../auth.js";

export const login = async (req, res) => {
    try {
        const user = await RegistrovaniKorisnik.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json("Nema korisnika sa tim username-om");
        }
        //console.log(user.tipKorisnika)
        //const validPassword = await bcrypt.compare(req.body.password, user.password)
        //!validPassword

        if (req.body.password != user.password) {
            return res.status(400).json("Pogrešna lozinka")
        }

        if (user.tipKorisnika == "Stanar") {
            const stanar = await Stanar.findOne({ registrovaniKorisnikId: user._id });

            if (stanar != null) {
                const token = generateAccessToken(stanar.registrovaniKorisnikId)
                const refreshToken = generateRefreshToken(stanar.registrovaniKorisnikId)

                let novi = {
                    registrovaniKorisnikId: user._id, //proveri, bilo je samo id:
                    ime: user.ime,
                    prezime: user.prezime,
                    username: user.username,
                    password: user.password,
                    tipKorisnika: user.tipKorisnika,
                    dugovanje: stanar.dugovanje,
                    stanarId: stanar._id,
                    zgrada: stanar.zgrada,
                    brStana: stanar.brStana,
                    upravnikId: stanar.upravnikId,  //dodato
                    brojUkucana: stanar.brojUkucana, //dodato

                    token: token,
                    refreshToken: refreshToken
                }
                return res.status(200).json(novi)
            }
            else {
                return res.status(404).json("Traženi stanar ne postoji");
            }
        }
        else if (user.tipKorisnika == "Upravnik") {
            const upravnik = await Upravnik.findOne({ registrovaniKorisnikId: user._id });

            if (upravnik != null) {
                const token = generateAccessToken(upravnik.registrovaniKorisnikId)
                const refreshToken = generateRefreshToken(upravnik.registrovaniKorisnikId)

                let novi = {
                    registrovaniKorisnikId: user._id,  //bilo je samo id:
                    ime: user.ime,
                    prezime: user.prezime,
                    tipKorisnika: user.tipKorisnika,
                    username: user.username,
                    password: user.password,
                    telefon: upravnik.telefon,
                    email: upravnik.email,
                    upravnikId: upravnik._id,
                    direktorId: upravnik.direktorId,  //dodato

                    token: token,
                    refreshToken: refreshToken
                }
                return res.status(200).json(novi)
            }
            else {
                return res.status(404).json("Traženi upravnik ne postoji");
            }
        }
        else if (user.tipKorisnika == "Direktor") {
            const direktor = await Direktor.findOne({ registrovaniKorisnikId: user._id });
            //console.log("direktor je")
            if (direktor != null) {
                const token = generateAccessToken(direktor.registrovaniKorisnikId)
                const refreshToken = generateRefreshToken(direktor.registrovaniKorisnikId)

                let novi = {
                    registrovaniKorisnikId: user._id,  //bilo je samo id
                    ime: user.ime,
                    prezime: user.prezime,
                    tipKorisnika: user.tipKorisnika,
                    username: user.username,
                    password: user.password,
                    telefon: direktor.telefon,
                    email: direktor.email,
                    direktorId: direktor._id,

                    token: token,
                    refreshToken: refreshToken
                }
                //console.log("dobro je")
                return res.status(200).json(novi)
            }
            else {
                return res.status(404).json("Traženi direktor ne postoji");
            }
        }
        else {
            return res.status(404).json("Neodgovarajući tip korisnika")
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
};

export const proveriSifru = async (req, res) => {
    try {
        const user = await RegistrovaniKorisnik.findOne({ _id: req.body.id });

        if (!user)
            return res.status(404).json("Nema takvog korisnika");

        //const validPassword = await bcrypt.compare(req.body.password, user.password)

        if(req.body.password != user.password) //(!validPassword)
            return res.status(400).json("Pogrešna lozinka");
        else {
            return res.status(200).json("Šifra je tačna");
            //return res.status(200).json(user);    ili ovako?
        }

    }
    catch (err) {
        return res.status(500).json(err)
    }
};

export const proveriEmail = async (req, res) => {
    try {
        const email = req.body.email;
        //console.log(email)
        let mailNovi = await Direktor.findOne({ email: email });
        //console.log(mailNovi) null
        if (!mailNovi)
            mailNovi = await Saradnik.findOne({ email: email });
            //console.log(mailNovi)
        if (!mailNovi)
            mailNovi = await Upravnik.findOne({ email: email });

        if (mailNovi)
            return res.status(404).json("Već postoji korisnik sa zadatim mail-om");
        else
            return res.status(200).json("Mail je odgovarajući")
    }
    catch (err) {
        return res.status(500).json(err)
    }
};

export const proveriUsername = async (req, res) => {
    try {
        const username = req.body.username;
        const usernameNovi = await RegistrovaniKorisnik.findOne({ username: username })

        if (usernameNovi)
            return res.status(404).json("Već postoji korisnik sa zadatim username-om");

        else
            return res.status(200).json("Username je odgovarajući")

    }
    catch (err) {
        return res.status(500).json(err)
    }
};

export const refresh = async (req, res) => {
  try {

    return

  }
  catch (err) {
    return res.status(500).json(err)
  }
};

export const vratiKorisnikaPrekoTokena = async (req, res) => {   
    try {
        //Vadimo token iz header-a zahteva:
        if (req.headers.authorization) {
            console.log(req.headers.authorization)
            const token = req.headers.authorization//.split(" ")[1];
            if (token) {
                console.log(token)
                //Proveravamo da li je token ispravan:
                jwt.verify(token, process.env.TOKEN_KEY, { ignoreExpiration: true },
                async (err, user) => {
                    if (err) {
                        return res.status(403).json("Token is not valid!");
                    }

                    console.log(user)

                    const korisnik1 = await RegistrovaniKorisnik.findById(user.id); // ili _id????
                    if (!korisnik1) {
                        return res.status(404).json("Nema takvog korisnika");
                    }

                    // console.log('  ')
                    // console.log(korisnik1)
                    // console.log('  ')

                    if (korisnik1.tipKorisnika == "Stanar") {
                        const stanar = await Stanar.findOne({ registrovaniKorisnikId: korisnik1._id });

                        if (korisnik1._id.toString() !== req.query.userId) {     //sae kveri userid
                            return res.status(402).json('Nije vas nalog')
                        }

                        const noviToken = generateAccessToken(korisnik1.registrovaniKorisnikId)
                        const refreshToken = generateRefreshToken(korisnik1.registrovaniKorisnikId)

                        //console.log('  ')
                        //console.log(korisnik1)
                        //  console.log('  ')

                        if (korisnik1 != null) {
                            let novi = 
                            {
                                registrovaniKorisnikId: korisnik1._id, //proveri
                                ime: korisnik1.ime,
                                prezime: korisnik1.prezime,
                                password: korisnik1.password, //proveri
                                tip: korisnik1.tipKorisnika,
                                dugovanje: stanar.dugovanje,
                                stanarId: stanar._id,
                                zgrada: stanar.zgrada,
                                brStana: stanar.brStana,

                                token: token,   //novi
                                refreshToken: refreshToken
                            }
                            return res.status(200).json(novi)
                        }
                        else {
                            return res.status(404).json("Nema stanara");
                        }
                    }
                    else if (korisnik1.tipKorisnika == "Upravnik") {
                        const upravnik = await Upravnik.findOne({ registrovaniKorisnikId: korisnik1._id });
                        console.log(upravnik)
                        if (upravnik != null) {

                            // if (upravnik._id.toString() !== req.query.userId) {
                            //   return res.status(402).json('Nije vaš nalog')                            nzm sae ovo kveri
                            // }

                            const noviToken = generateAccessToken(upravnik.registrovaniKorisnikId)
                            const refreshToken = generateRefreshToken(upravnik.registrovaniKorisnikId)

                            let novi = {
                                registrovaniKorisnikId: korisnik1._id,
                                ime: korisnik1.ime,
                                prezime: korisnik1.prezime, 
                                tip: korisnik1.tipKorisnika,
                                password: user.password, //proveri
                                telefon: upravnik.telefon,
                                email: upravnik.email,
                                upravnikId: upravnik._id,

                                token: noviToken,
                                refreshToken: refreshToken
                            }
                            return res.status(200).json(novi)
                        }
                        else {
                            return res.status(404).json("Traženi upravnik ne postoji");
                        }
                    }
                    else if (korisnik1.tipKorisnika == "Direktor"){
                        const direktor = await Direktor.findOne({ registrovaniKorisnikId: korisnik1._id });

                        if (direktor != null) {

                            if (direktor._id.toString() !== req.query.userId) {
                                return res.status(402).json('Nije vaš nalog')
                            }

                            const noviToken = generateAccessToken(direktor.registrovaniKorisnikId)
                            const refreshToken = generateRefreshToken(direktor.registrovaniKorisnikId)

                            let novi = {
                                registrovaniKorisnikId: korisnik1._id,
                                ime: korisnik1.ime,
                                prezime: korisnik1.prezime,
                                password: user.password, //proveri
                                tip: korisnik1.tipKorisnika,
                                telefon: direktor.telefon,
                                email: direktor.email,
                                direktorId: direktor._id,

                                token: noviToken,
                                refreshToken: refreshToken
                            }
                            return res.status(200).json(novi)
                        }
                        else {
                            return res.status(404).json("Traženi direktor ne postoji");
                        }
                    }
                    else {
                        return res.status(404).json("Neodgovarajući tip korisnika")
                    }

                });
            }
            else {
                //Za slucaj da nema tokena:
                return res.status(401).json('You are not authorized!');
            }
        }
        else {
            res.status(403).json("Auth token is missing!");
        }
    } catch (err) {
        console.log(err);
    }
};

export default router;