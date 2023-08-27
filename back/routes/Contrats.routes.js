// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const contratController = require('../controllers/contrat.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("ADMIN,FINANCIER"), contratController.createContrat);
router.get('/getAll',isAuthenticated, checkRole("ADMIN,CHEFESCALE,FINANCIER"), contratController.getAllContrat);
router.get('/get/:id', isAuthenticated, checkRole("ADMIN,FINANCIER"), contratController.getById);
router.put('/update/:id',isAuthenticated, checkRole("ADMIN,FINANCIER"), contratController.updateContrat);
router.delete('/delete/:id',isAuthenticated, checkRole("ADMIN,FINANCIER"), contratController.deleteContrat);



router.get('/getByRetard/:id', contratController.getContratByRetard);

module.exports = router;
