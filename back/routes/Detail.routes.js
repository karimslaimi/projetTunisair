const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/add',isAuthenticated, checkRole("FINANCIER"), detailController.create);
router.get('/getAll',isAuthenticated, checkRole("FINANCIER"), detailController.getAll);
router.get('/get/:id',isAuthenticated, checkRole("FINANCIER"), detailController.getById);
router.get('/getByFacture/:idFacture',isAuthenticated, checkRole("FINANCIER"), detailController.getByFacture);
router.put('/update/:id',isAuthenticated, checkRole("FINANCIER"), detailController.updateById);
router.delete('/delete/:id',isAuthenticated, checkRole("FINANCIER"), detailController.deleteById);

module.exports = router;
