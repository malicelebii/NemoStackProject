const express = require('express');
const router = express.Router();


/*Get home page */

router.get('/',(req,res,next)=>{
    res.render('users')
})

module.exports=router;
