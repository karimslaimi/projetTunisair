const { MAIL_CONFIG, FROM_MAIL } = require('../config/mail.config');
const Fournisseur = require('../models/Fournisseur.model');
const nodemailer = require('nodemailer');

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

async function sendMail(req, res) {
    const id = req.params.id;
    const fournisseur = await Fournisseur.findById(id);

    if (!fournisseur){
        res.status(500).json({error:"an error occured"});
    }
    const transporter = nodemailer.createTransport(MAIL_CONFIG);

    const mailOptions = {
        from: FROM_MAIL,
        to: fournisseur.email,
        subject: req.body.subject,
        html: req.body.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully.');
        }
    });


}

module.exports = {
    createFournisseur,
    getFournisseurs,
    getFournisseurById,
    updateFournisseur,
    deleteFournisseur,
    sendMail,
};
