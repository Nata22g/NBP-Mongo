import express from "express";
const router = express.Router();

import { prikaziSveKvaroveStanar, prikaziSveKvaroveDirektor, prikaziSveKvaroveUpravnik,
     prijaviKvar, proslediKvarDirektoru, odbijKvarUpravnik, popraviKvarDirektor} from "../controllers/kvar.js";
import {auth, direktorMethod, stanarMethod, upravnikMethod} from "../auth.js";
import {upload} from "./auth.js";

router.get('/prikaziSveKvaroveStanar/:id', auth, stanarMethod, prikaziSveKvaroveStanar); //radi
router.get('/prikaziSveKvaroveDirektor/:id', auth, direktorMethod, prikaziSveKvaroveDirektor); //radi
router.get('/prikaziSveKvaroveUpravnik/:upravnikId/:zgradaId', auth, upravnikMethod, prikaziSveKvaroveUpravnik); //radi
router.put('/proslediKvarDirektoru/:id', auth, upravnikMethod, proslediKvarDirektoru); //radi - ne menja se u zg kvarovi status kvara
router.post('/prijaviKvar/:id', auth, stanarMethod, upload.single('file'), prijaviKvar); //radi
router.put('/odbijKvarUpravnik/:id', auth, upravnikMethod, odbijKvarUpravnik); //radi
router.put('/popraviKvarDirektor/:id', auth, direktorMethod, popraviKvarDirektor)

export default router;