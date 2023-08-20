const Article = require("../models/Article.model"); // Make sure to provide the correct path to your Retard model
const Contrat = require("../models/Contrat.model");
const ArticleContrat = require("../models/ArticleContrat.model");
const Fournisseur = require("../models/Fournisseur.model");


async function createContrat(req, res) {
    try {
        const contratData = req.body;
        const fournisseurId = contratData.fournisseur; 
        const fournisseur = await Fournisseur.findById(fournisseurId);
        contratData.fournisseur = fournisseur._id;
        const savedContrat = await Contrat.create(contratData);

        // No need to fetch the entire Article, just use the ID directly
        const articleLinks = contratData.articles.map(articleId => ({
            Article: articleId, // Note the capital "A" here
            contrat: savedContrat._id
        }));

        await ArticleContrat.insertMany(articleLinks);

        res.status(201).json(savedContrat);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}


async function getAllContrat(req,res){
    try{
        const contrats = await Contrat.find().populate("fournisseur","title").populate("articles").exec();
        res.status(200).json(contrats);

    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}


async function deleteContrat(req,res){
    try{
        const id = req.params.id;
        const deletedContrat = await Contrat.findByIdAndDelete(id);
        if (deletedContrat) {
            await ArticleContrat.deleteMany({ contrat: id });
            res.status(200).json({ message: 'Contrat and associated articles deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contrat not found' });
        }
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
}


async function getById(req, res) {
    try {
        const contratId = req.params.id;
        const contrat = await Contrat.findById(contratId).populate("fournisseur").populate("articles");
        
        if (contrat) {
            res.status(200).json(contrat);
        } else {
            res.status(404).json({ message: 'Contract not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error getting vol by ID' });
    }
}

async function updateContrat(req,res){
    const contratId = req.params.id;

    try {
        // Update the Contrat with all fields from the request body
        const updatedContrat = await Contrat.findByIdAndUpdate(contratId, req.body, { new: true });

        if (!updatedContrat) {
            return res.status(404).json({ message: 'Contrat not found' });
        }
        await ArticleContrat.deleteMany({ contrat: contratId });

        // b. Create new associations
        const newArticleLinks = updatedContrat.articles.map(articleId => ({
            Article: articleId,
            contrat: contratId
        }));
        
        await ArticleContrat.insertMany(newArticleLinks);

        // If you're updating articles through ArticleContrat, do so here...

        res.status(200).json(updatedContrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
module.exports = {
    createContrat,
    getAllContrat,
    deleteContrat,
    updateContrat,
    getById
}