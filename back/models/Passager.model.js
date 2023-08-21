const mongoose = require("mongoose");

const Passager = mongoose.model(
    "Passager",
    new mongoose.Schema({
        name:{type:String, required:true},
        vol: { type: mongoose.Schema.Types.ObjectId, ref: 'Vol' },
        
    })
)

module.exports = Passager;