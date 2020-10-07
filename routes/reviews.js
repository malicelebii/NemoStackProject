const express = require('express');
const router = express.Router({mergeParams:true}); // mergeParams allow us to receive posts' id
const {asyncErrorHandler,isReviewAuthor} =require('../middleware/index');
const {reviewCreate,reviewDelete,reviewUpdate} =require('../controllers/review')

//Create a /posts/:id/reviews
router.post('/',asyncErrorHandler(reviewCreate))


//Put update a review /posts/reviews/:review_id  --- we used :id for posts so we cannot use that for review.then we use review_id
router.put('/:review_id',isReviewAuthor,asyncErrorHandler(reviewUpdate))

//Delete a review  /reviews/:id
router.delete('/:review_id',isReviewAuthor,asyncErrorHandler(reviewDelete))

module.exports=router;
