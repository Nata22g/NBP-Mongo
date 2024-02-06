import mongoose from "mongoose";

const DirektorSchema = new mongoose.Schema({
    registrovaniKorisnikId: {
        type: mongoose.SchemaTypes.ObjectId,

    }, upravnici: {
        type: Array,
        default : []

    }, email: {
        type: String,           
        max: 20

    }, telefon: {
        type: Number,
        max: 999999999999

    }, prihvaceniKvarovi: {
        type: Array,
        default: []
    }
}, {timestamps: true});

export default mongoose.model("Direktor", DirektorSchema);