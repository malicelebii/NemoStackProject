const express = require('express');
const router = express.Router();
const { postRegister,postLogin,getLogout } = require('../controllers/index');
const { asyncErrorHandler } = require('../middleware')//if you dont write /index like above javascript get it for you


/*Get home page */

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
})


/*Get /register */
router.get('/register', (req, res, next) => {
    res.send('Get /register')
})


/*post /register */
router.post('/register', asyncErrorHandler(postRegister))


/*Get /login */
router.get('/login', (req, res, next) => {
    res.send('get /login')
})


/*post /login */
router.post('/login',postLogin)

/*Get /logout */
router.get('/logout', getLogout)


/*get /profile */
router.get('/profile', (req, res, next) => {
    res.send('get /profile')
})

/*put-update /profile */
router.put('/profile/:user_id', (req, res, next) => {
    res.send('put /profile/:user_id')
})


/*Get /forgot */
router.get('/forgot', (req, res, next) => {
    res.send('get /forgot')
})


/*put /forgot */
router.put('/forgot', (req, res, next) => {
    res.send('put /forgot')
})


/*Get /reset/:token */
router.get('/reset/:token', (req, res, next) => {
    res.send('get /reset/:token')
})


/*put /reset/:token */
router.put('/reset/:token', (req, res, next) => {
    res.send('put /reset/:token')
})



module.exports = router;
