const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

// router.get('/addUser', async(req, res) => {
//     const user = {username: 'staff1', fullname: 'bot1'};
//     const newUser = new Schemas.Users(user);

//     try {
//         await newUser.save().then(async(err, newUserResult) => {
//             console.log('New user created!');
//             res.end('New user created!');
//         });
//     } catch (err) {
//         console.log(err);
//         res.end('Cannot add new user!');
//     }
// });

router.get('/news', async (req, res) => {
    const news = Schemas.News;

    const userNews = await news.find({}).populate('user').exec((err, newData) => {
        if (err) throw err;
        if (newData) {
            res.end(JSON.stringify(newData));
        } else {
            res.end()
        }
    })
})

router.post('/addNew', async(req, res) => {
    const user = Schemas.Users;
    // const userTitle = req.body.titleInput;
    // const userContent = req.body.contentInput;
    const userTitle = "Title1";
    const userContent = "content1";
    const userId = await user.findOne({username: 'admin'}).exec();

    const newNews = new Schemas.News({
        title: userTitle,
        content: userContent,
        user: userId._id
    })

    try {
        await newNews.save().then((err, newNewsResult) => {
            if (err) res.end('Error!');
            res.redirect('/news');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/news');
        res.end();
    }
})

module.exports = router;