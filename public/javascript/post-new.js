let postEditForm = document.getElementById('postEditForm');
postEditForm.addEventListener('submit', (event) => {
    //check image counts
    let imageUpload = document.getElementById('imageUpload').files.length;
    if (imageUpload > 4) {
        event.preventDefault();
        alert(`you can add Max:4 images`)
    }
})

