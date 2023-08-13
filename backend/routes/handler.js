const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

//USERS API
//ADD USER (NOT DONE YET)
router.post('/api/user', async(req, res) => {
    const user = {username: 'admin', fullname: 'Fong Nguyen', password: '12022002'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save().then(async(err, newUserResult) => {
            res.status(200).json('New user created!');
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN API
router.post('/login', async(req, res) => {
    try {
        const users = Schemas.Users;
        const checkUsername = await users.findOne({username: req.body.username});
        if (checkUsername != null) {
            if (checkUsername.password == req.body.password) {
                res.status(200).json('Login success!');
            } else {
                res.status(401).json('Wrong password!')
            }
        } else {
            res.status(401).json('Username does not exist!')
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

//NEWS API
//GET ALL NEWS
router.get('/api/news', async (req, res) => {
    try {
        const news = Schemas.News;
        const allNews = await news.find({});
        res.status(200).json(allNews);
    } catch(err) {
        res.status(500).json(err);
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
        res.status(200).json(newsData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving news: ', error });
    }
});

//POST NEWS
router.post('/api/news', async(req, res) => {
    // const userTitle = req.body.titleInput;
    // const userContent = req.body.contentInput;
    // const userTitle = "Title1";
    // const userContent = "content1";
    const users = Schemas.Users;
    const userPost = await users.findOne({username: 'admin'}).exec();
    try {
        const newNews = new Schemas.News({
            title: req.body.title,
            content: req.body.content,
            userId: userPost._id,
            username: userPost.username
        })
        const saveNews = await newNews.save();
        res.status(200).json(saveNews);
    } catch(err) {
        // res.redirect('/api/news');
        res.status(500).json(err);
    }
})

//UPDATE NEW BY ID
router.put('/api/news/:id', async(req, res) => {
    try{
        const news = Schemas.News;
        const users = Schemas.Users;
        const userPut = await users.findOne({username: 'staff1'}).exec();
        const updateNewId = await news.findById(req.params.id);
        if (userPut._id.valueOf() == updateNewId.userId.valueOf()) {
            const updateNews = await news.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Update news successful!");
        } else {
            res.status(403).json("You cannot update news that are not yours!");
        }
    } catch(err){
        res.status(500).json(err);
    }
})

//DELETE NEW BY ID
router.delete('/api/news/:id', async(req, res)=>{
    try{
        const news = Schemas.News;
        const users = Schemas.Users;
        const userId = await users.findOne({username: 'admin'}).exec();
        const deleteNewsId = await news.findById(req.params.id);
        if (userId._id.valueOf() == deleteNewsId.userId.valueOf()) {
            const deleteNews = await news.findByIdAndDelete(req.params.id);
            res.status(200).json(`News deleted: ${deleteNews}`);
        } else {
            res.status(403).json("You cannot delete news that are not yours!");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;