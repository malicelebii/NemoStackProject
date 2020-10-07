    //find post edit form
    let postEditForm = document.getElementById('postEditForm');

    postEditForm.addEventListener('submit', (event) => {
        //find lenght of upload images
        let imageUpload = document.getElementById('imageUpload').files.length;
        //find total number of existing images
        let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
        //find total number of potential deletions
        let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked').length;
        //figure out if the form can be submited or not
        let newTotal=imageUpload+existingImgs-imgDeletions;
        
        if(newTotal>4){
            let removalAmt=newTotal-4;
            event.preventDefault();
            alert(`You need to remove at least ${removalAmt} image${removalAmt===1? '' : 's'}`)// if removalAmt is equal 1 dont do anything , otherwise put s end
        }

    });



