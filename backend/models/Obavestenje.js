import mongoose from "mongoose";

const ObavestenjeSchema = new mongoose.Schema({

    autorId: {
        type: mongoose.SchemaTypes.ObjectId,

    }, naslov:{
        type: String,
        max: 20

    }, ime:{
        type: String,

    }, prezime:{
        type: String,

    }, opis: {
        type: String,
        max: 200

    }, datum: {
        type: Date,

    }, zgrada: {    
        type: mongoose.SchemaTypes.ObjectId 

    }, tipAutora: {
        type: String,
        enum:["Stanar", "Upravnik"]
    }

    
}, {timestamps: true});


export default mongoose.model("Obavestenje", ObavestenjeSchema);