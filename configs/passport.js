const passport = require('passport'); // import passport library
const LocalStrategy = require('passport-local').Strategy; // import passport-local library
const bcrypt = require('bcrypt'); // import bcrypt library to encrypt and compare passwords
const { getUserByEmail, getUserById } = require('../controllers/userController'); // import function to get user by email from controller

// create local strategy for passport
let customFields = {
    usernameField: 'email', // specify email as the field to use for username
    passwordField: 'password' // specify password as the field to use for password
};

let stratgy = async function (email, password, done) { // define the authentication function
    try {
        let user = await getUserByEmail(email); // find user in database by email using controller function
        if (user.length == 0) return done(null, false, { message: "No user with that email",isSuccess:'false' }); // return error message if user is not 
        //temprory log
        // console.log('email matched', password, user[0].password)
        const passwordMatch = await bcrypt.compare(password, user[0].password); // compare user's password with the hashed password in database
        if (!passwordMatch) {
            // console.log('password not matched');
            return done(null, false, { message: 'Password is incorrect',isSuccess:'false' });
        } // return error message if password doesn't match
        //temprory log
        // console.log('password matched')
        return done(null, user[0]); // return user object if authentication is successful
    } catch (err) {
        return done(err); // return error if an error occurs during authentication
    }
}
passport.use(new LocalStrategy(customFields, stratgy));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(async function (id, done) {
    try {
        let user = await getUserById(id)
        done(null, user);
    } catch (error) {
        done(error, user);
    }
});