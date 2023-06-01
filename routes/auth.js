const express = require('express');
const path = require('path')
const router = express.Router();
const bcrypt = require('bcrypt');
const { addUser, getUserByEmail } = require('../controllers/userController');
const flash = require('express-flash');
const passport = require('passport')
const {isUserAuthenticated,isUserUnAuthenticated} = require('../middlewares/authenticate')
router.use(express.static(path.join(__dirname, '../public')));


router.get('/login',isUserUnAuthenticated, (req, res) => {
    const flash = {
        title: 'Login into your account',
        isSuccess: req.flash('isSuccess'),
        message: req.flash('message')
    }
    
    let error = req.flash('error');

    if(error.length){
        flash.isSuccess = 'false';
        flash.message = error;
    }
    // console.log('login flash : ',flash)

    res.render('login', flash)
});

router.post('/login',isUserUnAuthenticated,passport.authenticate('local',
{
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.get('/signup',isUserUnAuthenticated, (req, res) => {
    const flash = {
        title: 'Signup into a new account',
        isSuccess: req.flash('isSuccess'),
        message: req.flash('message')
    }

    res.render('signup', flash)
});

router.post('/signup',isUserUnAuthenticated, async (req, res) => {
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    try {
        let response = await addUser(user);
        req.flash('message', 'Account created successfully!!');
        req.flash('isSuccess', 'true');
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('message', error);
        req.flash('isSuccess', 'false');
        res.redirect('/auth/signup');
    }
});

router.get('/signout', (req, res) => {
    req.logout(() => {
        return res.redirect('/auth/login')
    });

})

// Middleware function to check if user is authenticated


module.exports = router;