const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

router.post("/addUser", usersController.addUser);
router.get("/getAll", usersController.getAllUser);
router.put("/update", usersController.updateUser);

module.exports = router;
