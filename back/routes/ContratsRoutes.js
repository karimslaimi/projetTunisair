// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contrat.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("ADMIN"), contratController.createContrat);
router.get('/getAll',isAuthenticated, checkRole("ADMIN"), contratController.getAllContrat);

module.exports = router;
