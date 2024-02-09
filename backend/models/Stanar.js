import mongoose from "mongoose";

const StanarSchema = new mongoose.Schema({
    registrovaniKorisnikId: {
        type: mongoose.SchemaTypes.ObjectId,

    }, brStana: {
        type: Number,

    }, zgrada: {
        type: String    //lokacija

    }, brojUkucana: {
        type: Number,
        default: 1

    }, kvarovi: {
        type: Array,
        default : []

    }, upravnikId: {
        type: mongoose.SchemaTypes.ObjectId

    },
}, {timestamps: true});

export default mongoose.model("Stanar", StanarSchema);