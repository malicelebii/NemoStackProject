const express = require('express');
const router = express.Router();


/*Get home page */

router.get('/',(req,res,next)=>{
    res.render('index',{title:'Express'})
})


/*Get /register */
router.get('/register',(req,res,next)=>{
    res.send('Get /register')
})


/*post /register */
router.post('/register',(req,res,next)=>{
    res.send('Post /register')
})


/*Get /login */
router.get('/login',(req,res,next)=>{
    res.send('get /login')
})


/*post /login */
router.post('/login',(req,res,next)=>{
    res.send('post /login')
})

/*get /profile */
router.get('/profile',(req,res,next)=>{
    res.send('get /profile')
})

/*put-update /profile */
router.put('/profile/:user_id',(req,res,next)=>{
    res.send('put /profile/:user_id')
})


/*Get /forgot-pw */
router.get('/forgot-pw',(req,res,next)=>{
    res.send('get /forgot-pw')
})


/*put /forgot-pw */
router.put('/forgot-pw',(req,res,next)=>{
    res.send('put /forgot-pw')
})


/*Get /reset-pw */
router.get('/reset-pw/:token',(req,res,next)=>{
    res.send('get /reset-pw/:token')
})


/*Get /reset-pw */
router.put('/reset-pw/:token',(req,res,next)=>{
    res.send('put /reset-pw/:token')
})



module.exports=router;
