const express = require('express');
const router = express.Router({mergeParams:true}); // mergeParams allow us to receive posts' id

//Get review index /posts/:id/reviews
router.get('/',(req,res,next)=>{
    res.send('posts/:id/reviews')
})

// //Get /posts/:id/reviews/new to create a review
// router.get('/new',(req,res,next)=>{
//     res.send('/reviews/new')
// })


//Create a /posts/:id/reviews
router.post('/',(req,res,next)=>{
  //some mongoose processes 
  res.send('GÖNDERDİMMM')
})


//Get a specific  review /posts/:id/reviews/review_id   we used :id for posts so we cannot use that for review.then we use review_id
router.get('/:review_id',(req,res,next)=>{
    res.send('posts/:id/reviews/:review_id')
})



//Get a review editing
router.get('/:id/edit',(req,res,next)=>{
    res.send('posts/:id/reviews/:review_id/edit')
})


//Put update a review /reviews/:id
router.put('/:id',(req,res,next)=>{
    res.send('Update posts/:id/reviews/:review_id')
})



//Delete a review  /reviews/:id
router.delete('/:id',(req,res,next)=>{
    res.send('DELETE posts/:id/reviews/:review_id')
})


module.exports=router;
