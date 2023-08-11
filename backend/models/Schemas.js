const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: ObjectId
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    entryDate: {type:Date, default:Date.now}
});

const newsSchema = new Schema({
    // _id:
    title: {type:String, required:true},
    content: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'},
    entryDate: {type:Date, default:Date.now}
})

const Users = mongoose.model('users', userSchema);
const News = mongoose.model('news', newsSchema);
const mySchemas = {'Users':Users, 'News':News};

module.exports = mySchemas;