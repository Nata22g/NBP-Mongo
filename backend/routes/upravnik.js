import express from "express";
const router = express.Router();
import { dodajUpravnika, vidiSveUpravnike, obrisiUpravnika, azurirajNalogUpravnik } from "../controllers/upravnik.js";
import { azurirajNalogRegKor } from "../controllers/registrovaniKorisnik.js";
import { auth, direktorMethod, upravnikMethod} from "../auth.js";
import { upload } from "./auth.js"

router.post('/dodajUpravnika/:id', auth, direktorMethod, upload.single('file'), dodajUpravnika); //radi
router.get('/vidiSveUpravnike', auth, direktorMethod, vidiSveUpravnike); //radi
router.delete('/obrisiUpravnika/:idUpr', auth, direktorMethod, obrisiUpravnika); //radi
router.put('/azurirajNalogUpravnik/:id', auth, upravnikMethod, azurirajNalogRegKor, azurirajNalogUpravnik);

export default router;