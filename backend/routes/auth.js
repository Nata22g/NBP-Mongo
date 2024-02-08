import multer from "multer";
import express from "express"

const router = express.Router();

export const upload = multer({});

import { login, proveriSifru, proveriEmail, proveriUsername, refresh, vratiKorisnikaPrekoTokena} from "../controllers/auth.js";
// import { refreshAuth } from "../auth.js";

router.post('/login', login); //radiiiiiiiiiiiiiiiiiiiiiiii
router.post('/proveriSifru', proveriSifru); //radi
router.post('/proveriEmail', proveriEmail); //radi
router.post('/proveriUsername', proveriUsername); //radi
router.post('/refresh', /*refreshAuth,*/ refresh); //radi
router.get('/vratiKorisnikaPrekoTokena', vratiKorisnikaPrekoTokena); //radi - kveri

export default router;