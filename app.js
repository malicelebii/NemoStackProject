require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const seedPosts = require('./seeds');
// seedPosts();
const dev = require('./config/dev')

//Connecting to the database
mongoose.connect(dev.mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection-error:'));
db.once('open', () => {
    console.log('We\'re connected to db!')
})


//require routes
const index = require('./routes/index')
const users = require('./routes/users')
const posts = require('./routes/posts')
const reviews = require('./routes/reviews')

const app = express();

//use ejs-locals for all ejs templates
app.engine('ejs', engine);
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //When u use the extended true,u can use some type of datas like that post[title] , otherwise u cannot use like that if extended is false
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Config passport and sessions
app.use(session({
    secret: 'Dude!',
    resave: false,
    saveUninitialized: true

}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    req.user = {
        '_id': '5ec2d8350f9ce6230013ea7f',
        'username': 'celeb1',
    }
    res.locals.currentUser=req.user;
    //set success flash message
    res.locals.success = req.session.success || '';
    delete req.session.success;
    //set error flash message
    res.locals.error = req.session.error || '';
    delete req.session.error;
    next()

})


//Mount routes
app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);


//Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
})

//error handler 
app.use((err, req, res, next) => {
    // //set locals,only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};
    // //render the error page
    // res.status(err.status || 500);
    // res.render('error');//{err:err}


    req.session.error = err.message;
    res.redirect('back');
})



app.listen(3000, () => { console.log('Uygulama calısıyor') });


module.exports = app;


