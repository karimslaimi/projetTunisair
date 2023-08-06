const express = require('express');
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes");
const ArticleRoutes = require("./routes/ArticleRoutes");
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
app.use('/users',UserRoutes);
app.use('/auth',AuthRoutes);
app.use('/article',ArticleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
