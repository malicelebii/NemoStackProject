const Post = require('../models/Post');
const Review = require('../models/Review');

module.exports = {
    //Reviews create /posts
    async reviewCreate(req, res, next) {
        let post = await Post.findById(req.params.id).populate('reviews').exec()
        let haveReviewed = post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;
        if(haveReviewed>3){
            req.session.error='You can only create one review per post.'
            return res.redirect(`/posts/${post.id}`)
        }

        //create the review
        req.body.review.author = req.user._id
        let review = await Review.create(req.body.review);
        post.reviews.push(review);
        post.save();
        req.session.success = 'Review created successfullu!'
        res.redirect(`/posts/${post.id}`)
    },

    //Reviews update /posts
    async reviewUpdate(req, res, next) {
        await Review.findByIdAndUpdate(req.params.review_id, req.body.review)
        req.session.success = 'Review updated succesfully!';
        res.redirect(`/posts/${req.params.id}`);

    },

    //Reviews delete /posts
    async reviewDelete(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { reviews: req.params.review_id }
        })
        let review = await Review.findByIdAndRemove(req.params.review_id)
        req.session.success = 'Review deleted Successfully';
        res.redirect(`/posts/${req.params.id}`);
    }


}