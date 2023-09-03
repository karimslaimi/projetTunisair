const Facture = require('../models/Facture.model');
const Detail = require('../models/Detail.model');


// Create a new facture
exports.create = async (req, res) => {
  try {

    const facture = new Facture(req.body);
    const savedFacture = await facture.save();
    res.status(200).json({ message: "Invoice added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all invoices
exports.getAll = async (req, res) => {
  const factures = await Facture.find().populate("fournisseur", "title");
  return res.json(factures);
};

// Get a single facture by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = await Facture.findById(id).populate("fournisseur").populate("details").exec();;
    if (!facture) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(facture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an facture by ID
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const facture = new Facture(req.body);
    const updatedFacture = await Facture.findByIdAndUpdate(id, facture, { new: true });
    if (!updatedFacture) {
      return res.status(403).json({ error: 'Facture not found' });
    }
    res.json(updatedFacture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an Facture by ID
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const details = await Detail.deleteMany({ facture: id });
    const deletedFacture = await Facture.findByIdAndDelete(id);
    if (!deletedFacture) {
      return res.status(404).json({ error: 'Facture not found' });
    }
    res.json({ message: 'Facture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
