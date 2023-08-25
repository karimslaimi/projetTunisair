// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const volController = require('../controllers/vol.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/addVol',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.createVol);
router.get('/getAll',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.getAllVols);
router.get('/get/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.getVolById);
router.put('/update/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.updateVol);
router.delete('/delete/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.deleteVol);

router.get('/getPass/:id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), volController.getPassangersByVol);

module.exports = router;
