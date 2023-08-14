const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const Fournisseur = mongoose.model('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;