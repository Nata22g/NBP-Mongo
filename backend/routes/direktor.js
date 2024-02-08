import express from "express";
const router = express.Router();

import { azurirajNalogDirektor } from "../controllers/direktor.js";
import { azurirajNalogRegKor } from "../controllers/registrovaniKorisnik.js";
import { auth, direktorMethod } from "../auth.js";

router.put('/azurirajNalogDirektor/:id', auth, direktorMethod, azurirajNalogRegKor, azurirajNalogDirektor);

export default router;