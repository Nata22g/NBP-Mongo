import mongoose from "mongoose";


const RegistrovaniKorisnikSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true

    }, password:{
        type: String,
        max: 20

    }, tipKorisnika:{
        type: String,
        enum: [ "Stanar", "Upravnik", "Direktor"]

    }, ime:{
        type: String,
        max: 20,
        
    }, prezime:{
        type: String,
        max: 20
        
    }, 
}, {timestamps: true});

export default mongoose.model("RegistrovaniKorisnik", RegistrovaniKorisnikSchema);