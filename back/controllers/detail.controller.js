const Detail = require('../models/Detail.model');
const Facture = require('../models/Facture.model');


// Create a new detail
exports.create = async (req, res) => {
  try {
    
    const detail  = new Detail(req.body);
    const savedDetail = await detail.save();
    await Facture.findByIdAndUpdate(savedDetail.facture, {
      $push: { details: savedDetail._id }
  });
    res.status(200).json({message:"Detail added successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all invoices
exports.getAll = async (req, res) => {
    const details = await Detail.find();
    return res.json(details);
};

exports.getByFacture = async (req,res)=>{
    const {idFacture} = req.params;
    const details = await Detail.find({facture: idFacture});
    return res.json(details);
}

// Get a single detail by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Detail.findById(id);
    if (!detail) {
      return res.status(404).json({ error: 'Detail not found' });
    }
    res.json(detail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an facture by ID
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail  = new Detail(req.body);
    const updatedDetail= await Detail.findByIdAndUpdate(id, detail);
    if (!updatedDetail) {
      return res.status(403).json({ error: 'Detail not found' });
    }
    res.json(updatedDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an Facture by ID
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDetail = await Detail.findByIdAndDelete(id);
    if (!deletedDetail) {
      return res.status(404).json({ error: 'Detail not found' });
    }
    res.json({ message: 'Detail deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
