const express = require('express');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

//routes
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routesHandler);

//mongodb connect
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true}).then( () => {
    console.log(`Mongodb connected!`);
}).catch( (err) => {
    console.log(err);
});

//run server backend
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server port: ${PORT}`);
});