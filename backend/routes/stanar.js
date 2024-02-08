import express from "express";
const router = express.Router();

import { dodajStanara, azurirajNalogStanar, obrisiStanara, uplatiDugovanje, pregledDugovanja} from "../controllers/stanar.js";
import { azurirajNalogRegKor } from "../controllers/registrovaniKorisnik.js";
import { auth, stanarMethod, upravnikMethod } from "../auth.js";
import { upload } from "./auth.js";

router.post('/dodajStanara', auth, upravnikMethod, upload.single('file'), dodajStanara); //radi
router.put('/azurirajNalogStanar/:id', auth, stanarMethod, azurirajNalogRegKor, azurirajNalogStanar);
router.delete('/obrisiStanara/:id', auth, upravnikMethod, obrisiStanara); //radi
router.put('/uplatiDugovanje/:id', auth, stanarMethod, uplatiDugovanje); //radi - isto ko kod naplati za zgradu
router.get('/pregledDugovanja/:id', auth, upravnikMethod, pregledDugovanja) //radi

export default router;