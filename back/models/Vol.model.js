const mongoose = require("mongoose");

const Vol = mongoose.model(
    "Vol",
    new mongoose.Schema({
        num_vol: { type: String, required: true },
        date_vol: { type: Date, required: true },
        origine: { type: String, required: true },
        destination: { type: String, required: true },
        nombre_passager: { type: Number, required: true },
        h_depart: { type: String, required: true },
        h_arrive: { type: String, required: true },
        retards: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retard'
          }]
    })
);

module.exports = Vol;
