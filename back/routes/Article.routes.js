// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const isAuthenticated = require('../middleware/AuthMiddleWare');
const checkRole = require('../middleware/RoleMiddleWare');

router.post('/addArticle',isAuthenticated, checkRole("ADMIN"), articleController.createArticle);
router.get('/getAll',isAuthenticated, checkRole("ADMIN"), articleController.getAllArticles);
router.get('/get/:id',isAuthenticated, checkRole("ADMIN"), articleController.getArticleById);
router.put('/update/:id',isAuthenticated, checkRole("ADMIN"), articleController.updateArticleById);
router.delete('/delete/:id',isAuthenticated, checkRole("ADMIN"), articleController.deleteArticleById);

module.exports = router;
