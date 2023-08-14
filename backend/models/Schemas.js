const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User: _id, username, fullname, password, entryDate, ...
//  will update: role (role admin can create more user).
const userSchema = new Schema({
    // _id: ObjectId
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    password: {type:String, required:true},
    entryDate: {type:Date, default:Date.now}
});


//News: _id, title, content, (userId, username) -> ref to user, entryDate,...
//  will update: category, ...
const newsSchema = new Schema({
    // _id:
    title: {type:String, required:true},
    content: {type:String, required:true},
    userId: {type:Schema.Types.ObjectId, ref:'users'},
    username: {type:String},
    entryDate: {type:Date, default:Date.now}
})

const Users = mongoose.model('users', userSchema);
const News = mongoose.model('news', newsSchema);
const mySchemas = {'Users':Users, 'News':News};

module.exports = mySchemas;