const Fournisseur = require('../models/Fournisseur.model');

// Create a new fournisseur
async function createFournisseur(req, res) {
    try {
        const newFournisseur = new Fournisseur(req.body);
        const savedFournisseur = await newFournisseur.save();
        res.json(savedFournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Retrieve all fournisseurs
async function getFournisseurs(req, res) {
    try {
        const fournisseurs = await Fournisseur.find();
        res.json(fournisseurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Retrieve a specific fournisseur by ID
async function getFournisseurById(req, res) {
    try {
        const fournisseur = await Fournisseur.findById(req.params.id);
        res.json(fournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a fournisseur by ID
async function updateFournisseur(req, res) {
    try {
        const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedFournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a fournisseur by ID
async function deleteFournisseur(req, res) {
    try {
        const deletedFournisseur = await Fournisseur.findByIdAndRemove(
            req.params.id
        );
        res.json(deletedFournisseur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createFournisseur,
    getFournisseurs,
    getFournisseurById,
    updateFournisseur,
    deleteFournisseur,
};
