function isUserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('username','Roshan Kumar');
        req.flash('path','./person.jpg')
        return next();
    }
    else {
        res.redirect('/auth/login');
    }
}

// Middleware function to check if user is not authenticated
function isUserUnAuthenticated(req, res, next) {
    // console.log(req);
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        req.flash('username','Roshan Kumar');
        req.flash('path','./person.jpg')
        res.redirect('/user');
    }
}
module.exports = {isUserAuthenticated,isUserUnAuthenticated}