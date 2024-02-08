import express from "express";
const router = express.Router();

import { dodajObavestenjeUpravnik, dodajObavestenjeStanar, obrisiObavestenjeUpravnik, obrisiObavestenjeStanar, prikaziSvaObavestenjaUpravnik, prikaziSvaObavestenjaStanar } from "../controllers/obavestenje.js";
import { auth, stanarMethod, upravnikMethod } from "../auth.js";

import { upload } from "./auth.js";


router.post('/dodajObavestenjeStanar/:id', auth, stanarMethod, upload.single('file'), dodajObavestenjeStanar);  
router.post('/dodajObavestenjeUpravnik/:upravnikId/:zgradaId', auth,  upravnikMethod, upload.single('file'), dodajObavestenjeUpravnik);
router.delete('/obrisiObavestenjeUpravnik/:obavestenjeId/:upravnikId', auth,  upravnikMethod, obrisiObavestenjeUpravnik);   
router.delete('/obrisiObavestenjeStanar/:obavestenjeId/:stanarId', auth, stanarMethod, obrisiObavestenjeStanar);    
router.get('/prikaziSvaObavestenjaStanar/:id', auth, stanarMethod, prikaziSvaObavestenjaStanar);               
router.get('/prikaziSvaObavestenjaUpravnik/:zgradaId', auth, upravnikMethod, prikaziSvaObavestenjaUpravnik);              

export default router;