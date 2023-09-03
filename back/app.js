const express = require('express');
const app = express();
const UserRoutes = require("./routes/User.routes");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/Auth.routes");
const ArticleRoutes = require("./routes/Article.routes");
const VolRoutes = require("./routes/Vol.routes");
const RetardRoutes = require("./routes/Retard.routes");
const ContratRoutes = require("./routes/Contrats.routes");
const fournisseurRoutes = require("./routes/fournisseur.routes");
const bonRoutes = require('./routes/Bon.routes');
const dashBoardRoutes = require("./routes/Dashboard.routes");
const factureRoutes = require("./routes/Facture.routes");
const detailRoutes = require("./routes/Detail.routes");
const cors = require('cors');

mongoose
    .connect(process.env.MONGO_URL || `mongodb://127.0.0.1:27017/tunisair`)
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Database connection error... ", err)
    });
app.use(express.json());


app.use(cors());

// Define your routes here...
app.use('/users', UserRoutes);
app.use('/auth', AuthRoutes);
app.use('/article', ArticleRoutes);
app.use('/vol', VolRoutes);
app.use('/retard', RetardRoutes);
app.use('/contrat', ContratRoutes);
app.use("/supplier", fournisseurRoutes);
app.use('/bon', bonRoutes);
app.use('/dashboard', dashBoardRoutes);
app.use("/facture",factureRoutes);
app.use("/detail",detailRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
