const Retard = require("../models/Retard.model"); // Make sure to provide the correct path to your Retard model
const Vol = require("../models/Vol.model");
// Create a new Retard
async function createRetard(req, res) {
    try {
        console.log(req.body);
        const newRetard = await Retard.create(req.body);
        var vol = await Vol.findOneAndUpdate({ _id: req.body.Vol }, {$push: {retards: newRetard._id}}, { new: true });
        await Retard.findOneAndUpdate({_id: newRetard._id},{vol:vol},{new:true});
        console.log(newRetard);
        res.status(201).json(newRetard);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all Retards
async function getAllRetards(req, res) {
    try {
        const retards = await Retard.find().populate("vol");
        console.log(retards);
        res.status(200).json(retards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a specific Retard by ID
async function getRetardById(req, res) {
    try {
        const retard = await Retard.findById(req.params.id);
        if (retard) {
            res.status(200).json(retard);
        } else {
            res.status(404).json({ message: "Retard not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a Retard by ID
async function updateRetardById(req, res) {
    try {
        const updatedRetard = await Retard.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedRetard) {
            res.status(200).json(updatedRetard);
        } else {
            res.status(404).json({ message: "Retard not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Delete a Retard by ID
async function deleteRetardById(req, res) {
    try {
        const deletedRetard = await Retard.findByIdAndRemove(req.params.id);
        if (deletedRetard) {
            res.status(200).json({ message: "Retard deleted" });
        } else {
            res.status(404).json({ message: "Retard not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRetard,
    getAllRetards,
    getRetardById,
    updateRetardById,
    deleteRetardById
};
