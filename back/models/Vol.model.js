const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volSchema =  new Schema({
        num_vol: { type: String, required: true },
        date_vol: { type: Date, required: true },
        origine: { type: String, required: true },
        destination: { type: String, required: true },
        nombre_passager: { type: Number, required: true },
        compagnie: { type: String, requuired: true },
        retards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retard'
        }],
        passagers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Passager'
        }],
    });


volSchema.virtual('passagerCount').get(function () {
    return this.passagers?.length;
});

volSchema.set('toJSON', { virtuals: true });
const Vol = mongoose.model(
    "Vol",
   volSchema
);
module.exports = Vol;
