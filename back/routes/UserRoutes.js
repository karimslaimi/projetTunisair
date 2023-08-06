const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post("/addUser",isAuthenticated, checkRole("ADMIN"), usersController.addUser);
router.get("/getAll", isAuthenticated, checkRole("ADMIN"), usersController.getAllUser);
router.put("/update/:id", isAuthenticated, checkRole("ADMIN"), usersController.updateUser);
router.delete("/delete/:id", isAuthenticated, checkRole("ADMIN"), usersController.deleteUser);

module.exports = router;
