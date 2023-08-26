const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RetardSchema = new Schema({
    duree_retard: { type: Number, required: true },
    vol: { type: Schema.Types.ObjectId, ref: 'Vol' },
    contrat: { type: Schema.Types.ObjectId, ref: 'Contrat' },
    bons: [{ type: Schema.Types.ObjectId, ref: 'Bon' }],
    created_at : {type: Date, default: Date.now },
});


RetardSchema.virtual('bonCount').get(function () {
    return this.bons?.length;
});

RetardSchema.set('toJSON', { virtuals: true });

const Retard = mongoose.model(
    'Retard',
    RetardSchema
);

module.exports = Retard;