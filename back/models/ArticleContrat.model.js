const mongoose = require("mongoose");

const ArticleContrat = mongoose.model(
    'ArticleContrat',
    new mongoose.Schema({
            Article: { type: Schema.Types.ObjectId, ref: 'Article', required:true },
            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat', required:true },
        })
);

module.exports = ArticleContrat;