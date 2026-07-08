const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const recordRoutes = require('./routes/recordRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/records', recordRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Connection failed', error);
    });