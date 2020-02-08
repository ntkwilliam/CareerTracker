module.exports = function(app, passport) {

	// HOMEPAGE =================================================================

	app.get('/', checkAuthenticated, function(req, res) {
		res.render('index.ejs', { username: req.user.username });
	});

	// LOGIN ====================================================================

	// Get login form
	app.get('/login', checkNotAuthenticated, function(req, res) {
		res.render('login.ejs');
	});

	// Post login form
	app.post('/login', checkNotAuthenticated, passport.authenticate('local-login', {
        	successRedirect : '/', // Redirect to homepage if successful
        	failureRedirect : '/login', // Redirect to signup page if failure
        	failureFlash : true // Display flash message after login attempt
	}));

	// SIGNUP =====================================================================

	// Get signup form
	app.get('/signup', checkNotAuthenticated, function(req, res) {
		res.render('signup.ejs');
	});

	// Post signup form
	app.post('/signup', checkNotAuthenticated, passport.authenticate('local-signup', {
		successRedirect : '/login', // Redirect to login if successful
		failureRedirect : '/signup', // Redirect to signup page if failure
		failureFlash : true // Display flash message after signup attempt
	}));

	// LOGOUT =====================================================================

	app.delete('/logout', function(req, res) {
		req.logOut();
		res.redirect('/login');
	});
};

// CHECK AUTHENTICATION============================================================

// Permission to view homepage
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated -> Proceed
    } 
    res.redirect('/login'); // User is not authenticated -> Return to login
}

// Permission to view login and register page
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
        return res.redirect('/'); // User is already authenticated -> Return to homepage
    }
    next(); // User is not authenticated yet -> Proceed
}






