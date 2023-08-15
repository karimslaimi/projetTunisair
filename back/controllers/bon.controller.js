// controllers/bonController.js
const Bon = require('../models/Bon.model');


const getbonByRetard = async (req, res) => {
    try {
        const retardId = req.params.retard_id;
        const bons = await Bon.find({ retard: retardId }).populate("retard","vol","vol.number").populate("contrat").exec();
        return res.status(200).json(bons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new bon entry
const createBon = async (req, res) => {
    try {
        const newBon = new Bon(req.body);
        const savedBon = await newBon.save();
        res.status(201).json(savedBon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bon entries
const getAllBons = async (req, res) => {
    try {
        const allBons = await Bon.find();
        res.status(200).json(allBons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a bon entry by ID
const getBonById = async (req, res) => {
    try {
        const bon = await Bon.findById(req.params.id);
        if (bon) {
            res.status(200).json(bon);
        } else {
            res.status(404).json({ message: 'Bon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a bon entry by ID
const updateBonById = async (req, res) => {
    try {
        const updatedBon = await Bon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedBon) {
            res.status(200).json(updatedBon);
        } else {
            res.status(404).json({ message: 'Bon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a bon entry by ID
const deleteBonById = async (req, res) => {
    try {
        const deletedBon = await Bon.findByIdAndDelete(req.params.id);
        if (deletedBon) {
            res.status(200).json({ message: 'Bon deleted successfully' });
        } else {
            res.status(404).json({ message: 'Bon not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getbonByRetard,
    createBon,
    getAllBons,
    getBonById,
    updateBonById,
    deleteBonById,
}