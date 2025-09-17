const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const DocgiaRoutes = require('./routes/DOCGIAroutes');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
app.use('/', DocgiaRoutes);

// RunningServer
const PORT = process.env.NODE_PORT || 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening at PORT : ${PORT}`)
        })
    })