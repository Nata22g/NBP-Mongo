import mongoose from "mongoose";

const KvarSchema = new mongoose.Schema({
    urgentnost:{
        type: String,
        enum:["Hitno je", "Nije hitno"]
        
    }, stanarId: {
        type: mongoose.SchemaTypes.ObjectId
        
    }, upravnikId: {
        type: mongoose.SchemaTypes.ObjectId

    }, naslov:{
        type: String,
        max: 20

    }, opis: {
        type: String,
        max: 70

    }, status:{
        type: String,
        enum: ["Prijavljen", "Prosleđen direktoru", "Popravka je u toku", "Odbijen", "Završen"]

    }, zgradaLokacija: {
        type: String

    }, stan: {
        type: Number
    },

},{timestamps: true});

export default mongoose.model("Kvar", KvarSchema);