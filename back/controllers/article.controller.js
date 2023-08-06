// controllers/articleController.js
const Article = require('../models/Article.model');


// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { title } = req.body;
    const article = new Article({ title });
    const savedArticle = await article.save();
    res.status(200).json({message:"Article added successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
    const articles = await Article.find();
    return res.json(articles);
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an article by ID
exports.updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedArticle) {
      return res.status(403).json({ error: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an article by ID
exports.deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
