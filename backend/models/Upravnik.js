import mongoose from "mongoose";

const UpravnikSchema = new mongoose.Schema({
    
    registrovaniKorisnikId: {
        type: mongoose.SchemaTypes.ObjectId,

    }, zgrade: {
        type: Array,
        default : []
        
    }, telefon: {
        type: Number,
        max: 999999999999

    }, email: {
        type: String,
        max: 20

    }, direktorId: {
        type: mongoose.SchemaTypes.ObjectId,   

    }, 
}, {timestamps: true});

export default mongoose.model("Upravnik", UpravnikSchema);