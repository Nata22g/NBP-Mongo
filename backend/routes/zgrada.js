import express from "express";
const router = express.Router();

import { dodajZgradu, prikaziSveStanareZgrade, prikaziSveZgrade, prikaziZgradeUpravnika, prikaziZgradeBezUpravnika, dodeliZgraduUpravniku, PrikaziSlobodneStanoveZgrade } from "../controllers/zgrada.js";
import {auth, direktorMethod, upravnikMethod} from "../auth.js";
import {upload} from "./auth.js";


router.post('/dodajZgradu/:id', auth, direktorMethod, upload.single('file'), dodajZgradu) //radi
router.get('/prikaziSveStanareZgrade/:zgradaId', auth, upravnikMethod, prikaziSveStanareZgrade); //radi
router.get('/prikaziSveZgrade', auth, direktorMethod, prikaziSveZgrade); //radi
router.get('/prikaziZgradeUpravnika/:id', auth, direktorMethod, prikaziZgradeUpravnika); //radi       // dir
router.get('/prikaziZgradeUpravnikaU/:id', auth, upravnikMethod, prikaziZgradeUpravnika);
router.get('/prikaziZgradeBezUpravnika/:id', auth, direktorMethod, prikaziZgradeBezUpravnika);  //radi
router.put('/dodeliZgraduUpravniku/:zgradaId/:upravnikId', auth, direktorMethod, dodeliZgraduUpravniku); //radi
router.get('/prikaziSlobodneStanoveZgrade/:id', auth, upravnikMethod, PrikaziSlobodneStanoveZgrade);

export default router;