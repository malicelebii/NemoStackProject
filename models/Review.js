const mongoose = require('mongoose');

const reviewSchema=new mongoose.Schema({
    body:String,
    author:{
            type:Schema.Types.ObjectId,
            ref:'User'
    }
   
})


module.exports=mongoose.model('Review',reviewSchema)

