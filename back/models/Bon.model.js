const mongoose = require('mongoose');

const bonSchema = new mongoose.Schema({
    id_bon: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    vol: { type: String, required: true },
    fournisseur: { type: String, required: true },
    prix: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    retard: { type: mongoose.Schema.Types.ObjectId, ref: 'Retard' },
});

module.exports = mongoose.model('Bon', bonSchema);