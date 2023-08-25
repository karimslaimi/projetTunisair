// routes/bonRoutes.js
const express = require('express');
const bonController = require('../controllers/bon.controller');
const router = express.Router();
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/createVoucher', isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), bonController.createBon);
router.get('/getAll',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"),  bonController.getAllBons);
router.put('/update/:id', isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), bonController.updateBonById);
router.delete('/delete/:id', isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"), bonController.deleteBonById);
router.get('/byretard/:retard_id',isAuthenticated, checkRole("ADMIN,FINANCIER,CHEFESCALE,AGENT"),  bonController.getbonByRetard);
router.get('/getDetail/:id', bonController.getBonDetail);

router.get('/get/:id', bonController.getBonById);
router.put("/consume/:id", bonController.consumeBon);

module.exports = router;
