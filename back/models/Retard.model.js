const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Retard = mongoose.model(
    'Retard',
    new Schema({
            duree_retard: { type: Number, required: true },
            vol: { type: Schema.Types.ObjectId, ref: 'Vol' },
            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat' },
        })
);

module.exports = Retard;