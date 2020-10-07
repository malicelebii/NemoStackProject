const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema = require('mongoose')

const userSchema=new mongoose.Schema({
    email:String,
    image:String
})


userSchema.plugin(passportLocalMongoose)

module.exports=mongoose.model('User',userSchema)

