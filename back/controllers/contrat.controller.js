const Retard = require("../models/Retard.model"); // Make sure to provide the correct path to your Retard model
const Contrat = require("../models/Contrat.model");


async function createContrat(req,res){
    try{

        const {contrat, articles} = req.body;
        console.log(contrat);
        console.log(articles);

    }catch(error){
        res.status(400).json({error:error.message});
    }
}