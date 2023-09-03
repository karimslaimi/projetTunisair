const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FactureSchema = new Schema({
    num_facture: {type:String, required:true},
    total: {type:Number, required:true},
    qte: {type: Number, required:true},
    date_debut: {type: Date, required:true},
    date_fin: {type: Date, required:true},
    fournisseur: {type: Schema.Types.ObjectId, ref:"Fournisseur"},
    details: [{type: Schema.Types.ObjectId, ref:"Detail"}],
});



FactureSchema.virtual("detailCount").get(()=>{
    return this.details?.length
});
FactureSchema.set("toJSON",{virtuals:true});

const Facture = mongoose.model(
    "Facture",
    FactureSchema
);
module.exports = Facture;