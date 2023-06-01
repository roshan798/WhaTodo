require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const session = require('express-session');
const flash=  require('express-flash');
const MySQLStore = require('express-mysql-session')(session);
const  connection = require('./configs/DB');
const sessionStore = new MySQLStore({},connection);
const passport = require('passport');
require('./configs/passport');


app.use(express.static('./public')); // added the static middleware to serve all static files from public directory
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave : false,
    saveUninitialized:false,
    store:sessionStore,
    cookie: {
        maxAge:  1000 * 60 * 60 * 24
    }
}));

app.use(flash()); // to use express-flash middleware

app.use(passport.initialize());
app.use(passport.session());

sessionStore.onReady().then(() => {
    console.log('MySQLStore ready');
}).catch(error => {
    console.error(error);
});

app.set('view engine','ejs'); // setting the view engine to ejs
app.set('views',path.join(__dirname,'./views'));
app.use('/auth',authRouter);
app.use('/user',userRouter);


app.get('/',(request,response)=>{
    response.redirect('/auth/login');
});

app.listen(PORT,()=>{
    console.log(`Server is listeninfg to http://localhost:${PORT}`);
});
