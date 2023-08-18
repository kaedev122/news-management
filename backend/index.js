const express = require('express');
const cors = require('cors');
const routesHandler = require('./routes/Handler.js');
const mongoose = require('mongoose');
require('dotenv/config');

//routes
const app = express();
app.use(cors(
    {
        origin: ["https://news-management-chsw.vercel.app"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true
));
app.use(express.json());
app.use(express.urlencoded());
app.use('/', routesHandler);
app.options('/*', (_, res) => {
    res.sendStatus(200);
});
//mongodb connect
const mongodb_uri = process.env.DB_URI; 
mongoose.connect(mongodb_uri, {useNewUrlParser:true, useUnifiedTopology:true}).then( () => {
    console.log(`Mongodb connected!`);
}).catch( (err) => {
    console.log(err);
});

//run server backend
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server port: ${PORT}`);
});
