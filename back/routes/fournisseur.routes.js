const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/fournisseur.controller');

router.post('/create', FournisseurController.createFournisseur);
router.get('/getAll', FournisseurController.getFournisseurs);
router.get('/get/:id', FournisseurController.getFournisseurById);
router.put('/update/:id', FournisseurController.updateFournisseur);
router.delete('/delete/:id', FournisseurController.deleteFournisseur);

router.post("/sendmail/:id",FournisseurController.sendMail);

module.exports = router;
