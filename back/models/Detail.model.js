const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
    numero: {type:String, required:true},
    date: {type: Date, required:true},
    price: {type:Number, required:true},
    nom: {type: String, required:true},
    prenom: {type: String, required:true},
    facture: {type: Schema.Types.ObjectId, ref:"Facture"},
});


const Detail = mongoose.model(
    "Detail",
    DetailSchema
);
module.exports = Detail;