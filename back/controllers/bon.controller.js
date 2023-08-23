// controllers/bonController.js
const Bon = require('../models/Bon.model');
const Retard = require("../models/Retard.model");



const getbonByRetard = async (req, res) => {
    try {
        const retardId = req.params.retard_id;
        const bons = await Bon.find({ retard: retardId }).populate({
            path: "retard",
            populate: {
                path: "vol",
                select: "vol_num",
            },
        }).populate({
            path: "retard",
            populate: {
                path: "contrat",
                select: "title",
            },
        }).exec();
        res.status(200).json(bons);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: error.message });
    }
}

// Create a new bon entry
const createBon = async (req, res) => {
    try {
        const newBon = new Bon(req.body);
        const exist = await Bon.find({ nom: newBon.nom, prenom: newBon.prenom, retard: newBon.retard });
        if (exist && exist.length > 0){
            return res.status(409).json({error:"Voucher already Exist"});
        }
        const savedBon = await newBon.save();
        await Retard.findByIdAndUpdate(newBon.retard, {
            $push: { bons: savedBon._id }
        });
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

const consumeBon = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(200).json(null);
        const bon = await Bon.findById(id);
        bon.consumed = true;
        const updatedBon = await Bon.findByIdAndUpdate(id, bon, { new: true });
        res.status(200).json(updatedBon);

    } catch (error) {
        res.status.json({ error: error.message });
    }
}

const getBonDetail = async (req, res)=>{
    const id = req.params.id;
    const bon = await Bon.findById(id).populate({
        path: "retard",
        populate: {
            path: "contrat",
            populate:{
                path:"articles",
                populate: {
                    path: "Article",
                }
            }
        },
    }).exec();
    res.json(bon);


}

module.exports = {
    getbonByRetard,
    createBon,
    getAllBons,
    getBonById,
    updateBonById,
    deleteBonById,
    consumeBon,
    getBonDetail,
}