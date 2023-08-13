// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const retardController = require('../controllers/retard.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("ADMIN"), retardController.createRetard);
router.get('/getAll',isAuthenticated, checkRole("ADMIN"), retardController.getAllRetards);
router.get('/get/:id',isAuthenticated, checkRole("ADMIN"), retardController.getRetardById);
router.put('/update/:id',isAuthenticated, checkRole("ADMIN"), retardController.updateRetardById);
router.put('/affectContrat/',isAuthenticated, checkRole("ADMIN"), retardController.affectContrat);
router.delete('/delete/:id',isAuthenticated, checkRole("ADMIN"), retardController.deleteRetardById);

module.exports = router;
