const express = require('express');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello!')
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server port: ${PORT}`)
})