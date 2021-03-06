const Post = require('../models/Post');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'malicelebi',
    api_key: '423347527411969',
    api_secret: process.env.CLOUDINARY_SECRET
})
module.exports = {
    //get posts index /
    async postIndex(req, res, next) {
		let posts = await Post.paginate({}, {
			page: req.query.page || 1,
			limit: 10
        });
        posts.page=Number(posts.page);
        res.render('posts/index', { posts })
    },



    //Get /new
    postNew(req, res, next) {
        res.render('posts/new')
    },
    //post create /posts
    async postCreate(req, res, next) {
        req.body.post.images = []
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path)
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            })
        }
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.post.location,
                limit: 1
            }).send();
        req.body.post.coordinates = response.body.features[0].geometry.coordinates;
        let post = await Post.create(req.body.post)
        req.session.success = 'Post created succesfully!'
        res.redirect(`/posts/${post.id}`)
    },
    //get show /posts/:id 
    async postShow(req, res, next) {
        let post =  await Post.findById(req.params.id).populate({
            path: 'reviews',
            options: { sort: { '_id': -1 } },   
            populate:{
                path:'author',
                model:'User'
            }
        });

        const floorRating=post.calculateAvgRating();

        res.render('posts/show', { post,floorRating })
    },
    //get editPost /posts/:id/edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id)
        res.render(`posts/edit`, { post })
    },

    async postUpdate(req, res, next) {
        // -find the post by id
        let post = await Post.findById(req.params.id);
        // -check if there's any images for deletion
        if (req.body.deleteImages && req.body.deleteImages.length) {
            //   -assign deleteImages from req.body to its own variable
            let deleteImages = req.body.deleteImages;
            //   -loop over deleteImages
            for (const public_id of deleteImages) {
                //-delete images from cloudinary
                await cloudinary.v2.uploader.destroy(public_id)
                //-delete images from post.images
                for (const image of post.images) {
                    if (image.public_id === public_id) {
                        let index = post.images.indexOf(image);
                        post.images.splice(index, 1);
                    }
                }
            }
        }
        // -check if there are any new images for upload 
        if (req.files) {
            //   -upload images
            for (const file of req.files) {
                let image = await cloudinary.v2.uploader.upload(file.path)
                //     -add images to  post.images array

                post.images.push({
                    url: image.secure_url,
                    public_id: image.public_id
                });
            }
        }
        //check if location was updated
        if (req.body.post.location !== post.location) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: req.body.post.location,
                    limit: 1
                }).send();
            post.coordinates = response.body.features[0].geometry.coordinates;
            post.location = req.body.post.location;
        }


        // -update the post with new any new properties
        post.title = req.body.post.title;
        post.description = req.body.post.description;
        post.price = req.body.post.price;
        // -save the updated post into the db
        post.save();
        // -redirect to show page
        res.redirect(`/posts/${post.id}`)
    },

    async postDelete(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id)
        for (const image of post.images) {
            await cloudinary.v2.uploader.destroy(image.public_id)
        }
        await post.remove();
        req.session.success='Post deleted successfuullu'
        res.redirect('/posts')
    }
}