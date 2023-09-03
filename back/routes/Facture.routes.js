const express = require('express');
const router = express.Router();
const factureController = require('../controllers/facture.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("FINANCIER"), factureController.create);
router.get('/getAll',isAuthenticated, checkRole("FINANCIER"), factureController.getAll);
router.get('/get/:id',isAuthenticated, checkRole("FINANCIER"), factureController.getById);
router.put('/update/:id',isAuthenticated, checkRole("FINANCIER"), factureController.updateById);
router.delete('/delete/:id',isAuthenticated, checkRole("FINANCIER"), factureController.deleteById);

module.exports = router;
