const Vol = require('../models/Vol.model');
const Passager = require('../models/Passager.model');

// Create a new vol
async function createVol(req, res) {
    try {
        const volData = req.body;
        const newVol = new Vol(volData);
        const savedVol = await newVol.save();
        res.status(201).json(savedVol);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating vol' });
    }
}

// Read all vols
async function getAllVols(req, res) {
    try {
        const allVols = await Vol.find();
        res.json(allVols);
    } catch (error) {
        res.status(500).json({ error: 'Error getting vols' });
    }
}

// Read a specific vol by ID
async function getVolById(req, res) {
    try {
        const volId = req.params.id;
        const vol = await Vol.findById(volId);
        if (vol) {
            res.json(vol);
        } else {
            res.status(404).json({ message: 'Vol not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting vol by ID' });
    }
}

// Update a vol by ID
async function updateVol(req, res) {
    try {
        const volId = req.params.id;
        const updatedData = req.body;
        const updatedVol = await Vol.findByIdAndUpdate(volId, updatedData, {
            new: true, // Return the updated document
            runValidators: true, // Run model validations on the updated data
        });
        if (updatedVol) {
            res.json(updatedVol);
        } else {
            res.status(404).json({ message: 'Vol not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating vol' });
    }
}

// Delete a vol by ID
async function deleteVol(req, res) {
    try {
        const volId = req.params.id;
        const deletedVol = await Vol.findByIdAndRemove(volId);
        if (deletedVol) {
            res.json(deletedVol);
        } else {
            res.status(404).json({ message: 'Vol not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting vol' });
    }
}

async function getPassangersByVol(req,res){
    try{
        const volId = req.params.id;
        const listP = await Passager.find({vol:volId}).populate("vol");
        res.status(200).json(listP);
    }catch(error){
        res.status(500).json({error: "Error occured"});
    }
}

module.exports = {
    createVol,
    getAllVols,
    getVolById,
    updateVol,
    deleteVol,
    getPassangersByVol,
};