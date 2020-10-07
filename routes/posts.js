const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const {asyncErrorHandler} =require('../middleware/index');
const {postIndex,postNew,postCreate,postShow,postEdit,postUpdate,postDelete}=require('../controllers/posts');

//Get post index /posts
router.get('/',asyncErrorHandler(postIndex))

//Get posts/new to create a post
router.get('/new',postNew)


//Create a post
router.post('/',upload.array('images',4),asyncErrorHandler(postCreate))


//Get a specific post
router.get('/:id',asyncErrorHandler(postShow))



//Get a post editing
router.get('/:id/edit', asyncErrorHandler(postEdit))


//Put update a post /posts/:id
router.put('/:id',upload.array('images',4),asyncErrorHandler(postUpdate))



//Delete a post  /posts/:id
router.delete('/:id',asyncErrorHandler(postDelete))


module.exports=router;
