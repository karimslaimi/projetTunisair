const mongoose = require("mongoose");

const contratSchema = new mongoose.Schema({
    title: { type: String, required: true },
    libelle_menu: { type: String, required: true },
    prix_menu: { type: Number, required: true },
    date_debut: { type: Date, required: true },
    date_fin: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleContrat',
      }], 
      retards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retard'
      }],
      fournisseur:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Fournisseur'
      }
});

const Contrat = mongoose.model('Contrat', contratSchema);

module.exports = Contrat;