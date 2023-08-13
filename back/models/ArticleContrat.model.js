const mongoose = require("mongoose");

const ArticleContrat = mongoose.model(
    'ArticleContrat',
    new mongoose.Schema({
            Article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required:true },
            contrat: { type: mongoose.Schema.Types.ObjectId, ref: 'Contrat', required:true },
        })
);

module.exports = ArticleContrat;