const Article = require("../models/Article.model"); // Make sure to provide the correct path to your Retard model
const Contrat = require("../models/Contrat.model");
const ArticleContrat = require("../models/ArticleContrat.model");
const Fournisseur = require("../models/Fournisseur.model");
const Retard = require("../models/Retard.model");


async function createContrat(req, res) {
    try {
        const contratData = req.body;
        const articles = contratData.articles;
        delete contratData.articles;

        const fournisseurId = contratData.fournisseur; 
        const fournisseur = await Fournisseur.findById(fournisseurId);
        contratData.fournisseur = fournisseur._id;
        const savedContrat = await Contrat.create(contratData);

        // No need to fetch the entire Article, just use the ID directly
        const articleLinks = articles.map(articleId => ({
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
        const contrat = await Contrat.findById(contratId).populate("fournisseur").populate({
            path: "articles",
            populate: {
                path: "Article",
            },
        }).exec();
        
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
    const contratData = req.body;
    const articles = contratData.articles;
    delete contratData.articles;

    try {
        const updatedContrat = await Contrat.findByIdAndUpdate(contratId, contratData, { new: true });

        if (!updatedContrat) {
            return res.status(404).json({ message: 'Contrat not found' });
        }

        // Delete existing ArticleContrat associations for the contrat
        await ArticleContrat.deleteMany({ contrat: contratId });

        // Create new ArticleContrat associations for the contrat
        const newArticleLinks = articles.map(articleId => ({
            Article: articleId,
            contrat: contratId
        }));

        const savedArticles = await ArticleContrat.insertMany(newArticleLinks);

        // Update the updatedContrat's articles field with the savedArticles
        updatedContrat.articles = savedArticles.map(article => article._id); // Assuming _id is the ObjectId

       await Contrat.findByIdAndUpdate(contratId, updatedContrat);

        // If you're updating articles through ArticleContrat, do so here...

        res.status(200).json(updatedContrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}


async function getContratByRetard(req,res){
    const id = req.params.id;
    const retard = await Retard.findById(id)
    .populate({
      path: 'contrat',
      populate: {
        path: 'fournisseur',
        model: 'Fournisseur', // Replace with the name of your Supplier model
      },
    });
    const contrat = retard.contrat;
    if(!contrat){
        return res.status(404).json({error:'Contrat not found'});
    }
    res.json(contrat);
}

module.exports = {
    createContrat,
    getAllContrat,
    deleteContrat,
    updateContrat,
    getById,
    getContratByRetard
}