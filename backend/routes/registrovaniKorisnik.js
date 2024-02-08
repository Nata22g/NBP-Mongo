import express from "express";

const router = express.Router();

import { azurirajNalogRegKor } from "../controllers/registrovaniKorisnik.js";
import { auth } from "../auth.js";

router.put('/azurirajNalogRegKor/:id', auth, azurirajNalogRegKor);


export default router;