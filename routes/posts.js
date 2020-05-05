const express = require('express');
const router = express.Router();

//Get post index /posts
router.get('/',(req,res,next)=>{
    res.send('/posts')
})

//Get posts/new to create a post
router.get('/new',(req,res,next)=>{
    res.send('/posts/new')
})


//Create a post
router.post('/',(req,res,next)=>{
  //some mongoose processes 
  res.send('GÖNDERDİMMM')
})


//Get a specific post
router.get('/:id',(req,res,next)=>{
    res.send('/posts/:id')
})



//Get a post editing
router.get('/:id/edit',(req,res,next)=>{
    res.send('/posts/:id/edit')
})


//Put update a post /posts/:id
router.put('/:id',(req,res,next)=>{
    res.send('Update /posts/:id')
})



//Delete a post  /posts/:id
router.delete('/:id',(req,res,next)=>{
    res.send('DELETE /posts/:id')
})


module.exports=router;
