const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect them to the login html page
    if(!req.session.loggin_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;