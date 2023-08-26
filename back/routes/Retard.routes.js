const express = require('express');
const router = express.Router();
const retardController = require('../controllers/retard.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.createRetard);
router.get('/getAll',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.getAllRetards);
router.get('/get/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.getRetardById);
router.put('/update/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.updateRetardById);
router.put('/affectContrat/',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.affectContrat);
router.delete('/delete/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), retardController.deleteRetardById);

module.exports = router;
