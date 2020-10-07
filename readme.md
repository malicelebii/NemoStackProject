# post edit form
-update checkbox name
-add enctype to form
# posts update route
-add upload.array()

# posts update method
-find the post by id
-check if there's any images for deletion
  -assign deleteImages from req.body to its own variable
  -loop over deleteImages
-check if there are any new images for upload 
  -upload images
    -add images to  post.images array
-update the post with new any new properties
-save the updated post into the db
-redirect to show page


# adding flash messages
-update pre-route middleware to check for error or success on the session
-update post-route error handling middleware to console.log() the full err, then set err.message on 
req.session.error and redirect('back')
-Create a partial for flash messages and include it in our layouts
-write some success messages throw some error to test it out




<div>
<%  reviews.forEach((review)=>{%>
    <h1><!-- author --></h1>
    <p><%review.body%></p>
    <h5>Rate: <%review.rating%> </h5>

    <%})%>
</div>







# markdown preview