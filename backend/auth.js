import express from "express";
const router = express.Router();
import jwt from 'jsonwebtoken';
import RegistrovaniKorisnik from "./models/RegistrovaniKorisnik.js";

//Lista validnih refresh tokena (cuva se na serverskoj strani, zbog sigurnosti):
//Ukoliko neko ukrade token, nakon isteka vremena nece moci nista da uradi bez refresh token-a!
//Opet, moze i on da se ukrade ali je dosta vece cimanje za isto!
let refreshTokens = [];

//Metoda za generisanje tokena:
export const generateAccessToken = (user) => {
    //Generise se na osnovu id-ja:
    //console.log(user._id)
    return jwt.sign({ id: user }, process.env.TOKEN_KEY, { expiresIn: "2h" });

};

//Metoda za generisanje refresh tokena:
export const generateRefreshToken = (user) => {
    const token = jwt.sign({ id: user }, process.env.REFRESH_KEY, { expiresIn: "1h" });
    refreshTokens.push(token);

    return token;
};

//autentifikacija
export const auth = (req, res, next) => {
    try {
        
        if (req.headers.authorization) {
           // console.log(req.headers.authorization)
            const token = req.headers.authorization
            //.split(" ")[1];
            if (token) {
            
                jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
                    if (err) {

                        return res.status(403).json("Token nije validan!");
                    }
                    
                    req.user = user;
                    return next();
                  
                });
            }
            else {
                //Za slucaj da nema tokena:
                return res.status(401).json('Niste autorizovani!');
            }
        }
        else {
            res.status(402).json("Nemate auth token!");
        }
    } catch (err) {
        console.log(err);
    }
};

//Zovemo nakon svake interakcije sa nekim delom sajta
//FIXME: Ukloni nakon prepravljanja:
export const refreshAuth = async (req, res) => {
    try {

        //Uzimamo refresh token i proveravamo da li je validan?
        const refreshToken = await req.body.refreshToken;


        //Ako nema refresh token-a?
        if (!refreshToken)
            return res.status(401).json("Niste autorizovani!");

        //Da li je refresh token validan?
        if (!refreshTokens.includes(refreshToken))
            return res.status(402).json("Refresh token nije validan!");


        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
                if (err)
                    console.log(err);
            

            refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            //Pravimo novi i token i refresh token i saljemo ih korisniku na cuvanje:

            const newAccessToken = generateAccessToken(user.id);
            const newRefreshToken = generateRefreshToken(user.id);

            //Sve okej, vracamo tokene nazad:
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500)
    }
};

export const upravnikMethod = async (req, res, next) => {
    try {
        //Pre ovoga je svakako bio auth, koji u req.user postavlja id korisnika koji je pozvao metodu
        const users = await RegistrovaniKorisnik.findById(req.user.id);

        if (users?.tipKorisnika != "Upravnik")
            return res.status(403).json("Samo upravnik može da pristupi!");
        else
            return next();


    } catch (err) {

        return res.status(500).json(err.Message);
    }
}

export const direktorMethod = async (req, res, next) => {
    try {
        //Pre ovoga je svakako bio auth, koji u req.user postavlja id korisnika koji je pozvao metodu
        const users = await RegistrovaniKorisnik.findById(req.user.id);

        if (users?.tipKorisnika != "Direktor")
            return res.status(403).json("Samo direktor može da pristupi!");
        else
            return next();


    } catch (err) {

        return res.status(500).json(err.Message);
    }
}

export const stanarMethod = async (req, res, next) => {
    try {
        //Pre ovoga je svakako bio auth, koji u req.user postavlja id korisnika koji je pozvao metodu
        const users = await RegistrovaniKorisnik.findById(req.user.id);

        if (users?.tipKorisnika != "Stanar")
            return res.status(403).json("Samo stanar može da pristupi!");
        else
            return next();


    } catch (err) {

        return res.status(500).json(err.Message);
    }
}

export default router;