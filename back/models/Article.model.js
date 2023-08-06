const mongoose = require("mongoose");

const Article = mongoose.model(
    "Article",
    new mongoose.Schema( {
        title: {
          type: String,
          required: true,
        },
      })
);

module.exports = Article;
