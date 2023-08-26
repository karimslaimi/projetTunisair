const Retard = require("../models/Retard.model");
const Vol = require("../models/Vol.model");
const Article = require("../models/Article.model");
const Contrat = require("../models/Contrat.model");
const { parse } = require('date-fns');

const countStat = async (req, res) => {
    try {
        const flightCount = await Vol.countDocuments();
        const delayCount = await Retard.countDocuments();
        const articlesCount = await Article.countDocuments();
        const contractCount = await Contrat.countDocuments();

        res.json({ flightCount, delayCount, articlesCount, contractCount })
    } catch (error) {
        res.status(500).json(error);
    }
}

const latestDelay = async (req, res) => {
    try {

        const retards = await Retard.find({}).populate("vol")
            .sort({ created_at: -1 })
            .limit(5);
        res.json(retards)
    } catch (error) {
        res.status(500).json(error);
    }
}

const latestContract = async (req, res) => {
    try {
        const contracts = await Contrat.find().populate("fournisseur")
            .sort({ created_at: -1 })
            .limit(5);
        res.json(contracts);
    } catch (error) {
        res.status(500).json(error);
    }
}

const contractByRetard = async (req, res) => {
    try {
        const result = await Retard.aggregate([
            {
                $group: {
                    _id: '$contrat', // Group by the contract field in Delay
                    numberOfDelays: { $sum: 1 }, // Count delays for each contract
                },
            },
            {
                $lookup: {
                    from: 'contrats', // Adjust to your Contrat collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'contractData',
                },
            },
            {
                $project: {
                    _id: 1,
                    title: { $arrayElemAt: ['$contractData.title', 0] }, // Get the title from the contractData array
                    numberOfDelays: 1,
                },
            },
            {
                $sort: { numberOfDelays: -1 } // Sort by 'count' in descending order
            }
        ]);

        res.json(result);

    } catch (error) {
        res.status(500).json(error);
    }
}

const contractCountBySupplier = async (req, res) => {

    try {
        const result = await Contrat.aggregate([
            {
                $group: {
                    _id: '$fournisseur', // Group by supplier
                    count: { $sum: 1 }, // Count contracts for each supplier
                },
            },
            {
                $lookup: {
                    from: 'fournisseurs', // Adjust to your fournisseur collection name
                    localField: '_id',
                    foreignField: '_id',
                    as: 'supplierData',
                },
            },
            {
                $project: {
                    title: { $arrayElemAt: ['$supplierData.title', 0] }, // Get the title from the supplierData array
                    count: 1,
                    _id: 0,
                },
            },
            {
                $sort: { count: -1 } // Sort by 'count' in descending order
            }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }

}

const getMonthlyVolCounts = async (req, res) => {

    try {
        const allVols = await Vol.find(); // Fetch all Vol documents

        // Group vols by month and count vols for each month
        // Group vols by month and count vols for each month
        const monthlyCounts = allVols.reduce((result, vol) => {
            const stringDate = vol.date_vol.toString();
            
            const parsedDate = parse(vol.date_vol.getDate().toString(), 'dd/MM/yyyy', new Date());

            const month = parsedDate.getMonth() + 1; // Add 1 to get 1-based month
            result[month] = (result[month] || 0) + 1;
            return result;
        }, {});
        // Create an array of length 12 with vol counts for each month
        const monthlyVolCounts = Array.from({ length: 12 }, (_, index) => {
            return monthlyCounts[index + 1] || 0;
        });

        res.json(monthlyVolCounts)
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    countStat,
    latestDelay,
    latestContract,
    contractCountBySupplier,
    contractByRetard,
    getMonthlyVolCounts
}