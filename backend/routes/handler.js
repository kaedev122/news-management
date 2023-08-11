const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

//USERS API
/*
router.get('/addUser', async(req, res) => {
    const user = {username: 'staff1', fullname: 'bot1'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save().then(async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch (err) {
        console.log(err);
        res.end('Cannot add new user!');
    }
});
*/

//NEWS API
//GET ALL NEWS
router.get('/api/news', async (req, res) => {
    try {
        const news = Schemas.News;
        const allNews = await news.find({});
        res.status(200).json(allNews)
    } catch(err) {
        res.json(err);
    }
/*
    const news = Schemas.News;

    const userNews = await news.find({}).populate('user').exec((err, newData) => {
        if (err) throw err;
        if (newData) {
            res.end(JSON.stringify(newData));
        } else {
            res.end()
        }
    })
*/
});


//GET NEWS BY ID
router.get('/api/news/:id', async(req, res) => {
    try {
        const news = Schemas.News;
        const newsData = await news.findById(req.params.id);
        res.json(newsData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving news: ', error });
    }
});

//POST NEW
router.post('/api/news', async(req, res) => {
    // const userTitle = req.body.titleInput;
    // const userContent = req.body.contentInput;
    // const userTitle = "Title1";
    // const userContent = "content1";
    const users = Schemas.Users;
    const userId = await users.findOne({username: 'admin'}).exec();
    try {
        const newNews = new Schemas.News({
            title: req.body.title,
            content: req.body.content,
            user: userId._id
        })
        const saveNews = await newNews.save();
        res.status(200).json(saveNews);
    } catch(err) {
        // res.redirect('/api/news');
        res.json(err);
    }
})

//UPDATE NEW BY ID
router.put('/api/news/:id', async(req, res) => {
    try{
        const news = Schemas.News;
        const users = Schemas.Users;
        const userId = await users.findOne({username: 'admin'}).exec();
        const updateNewId = await news.findById(req.params.id);
        if (`${userId._id}` == `${updateNewId.user}`) {
            const updateNews = await news.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Update successful!");
        } else {
            res.status(403).json("You cannot update news that are not yours!");
        }
    } catch(err){
        res.json(err);
    }
})

//DELETE NEW BY ID
router.delete('/api/news/:id', async(req, res)=>{
    try{
        const news = Schemas.News;
        const users = Schemas.Users;
        const userId = await users.findOne({username: 'admin'}).exec();
        const deleteNewsId = await news.findById(req.params.id);
        if (`${userId._id}` == `${deleteNewId.user}`) {
            const deleteNews = await news.findByIdAndDelete(req.params.id);
            res.status(200).json(`New deleted: ${deleteNews}`);
        } else {
            res.status(403).json("You cannot delete news that are not yours!");
        }
    }catch(err){
        res.json(err);
    }
})

module.exports = router;