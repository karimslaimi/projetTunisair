// routes/bonRoutes.js
const express = require('express');
const bonController = require('../controllers/bon.controller');
const router = express.Router();
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/createVoucher', isAuthenticated, checkRole("ADMIN"), bonController.createBon);
router.get('/getAll',isAuthenticated, checkRole("ADMIN"),  bonController.getAllBons);
router.get('/get/:id', isAuthenticated, checkRole("ADMIN"), bonController.getBonById);
router.put('/update/:id', isAuthenticated, checkRole("ADMIN"), bonController.updateBonById);
router.delete('/delete/:id', isAuthenticated, checkRole("ADMIN"), bonController.deleteBonById);
router.get('/byretard/:retard_id',isAuthenticated, checkRole("ADMIN"),  bonController.getbonByRetard);


module.exports = router;
