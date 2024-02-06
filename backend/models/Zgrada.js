import mongoose from "mongoose";

const ZgradaSchema = new mongoose.Schema({
    brStanova: {
        type: Number

    }, lokacija: {   
        type: String    

    }, stanari: {
        type: Array,
        default : []

    }, upravnikId: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null
    
    }, kvarovi: {
        type: Array,
        default: []

    }, obavestenja: {
        type: Array,
        default: []

    }, slika: {
        type: String
    }
}, {timestamps: true});

export default mongoose.model("Zgrada", ZgradaSchema);