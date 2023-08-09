const mongoose = require("mongoose");

const ArticleContrat = mongoose.model(
    'ArticleContrat',
    new mongoose.Schema({
            Article: { type: Schema.Types.ObjectId, ref: 'Article' },
            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat' },
        })
);

module.exports = ArticleContrat;