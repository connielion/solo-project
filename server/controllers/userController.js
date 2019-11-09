const User = require('../models/userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
    User.find({}, (err, users) => {
        // if a database error occurs, call next with the error message passed in
        // for the express global error handler to catch
        if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
        //console.log('Users: ', users)
        // store retrieved users into res.locals and move on to next middleware
        res.locals.users = users;
        return next();
    });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
    // write code here
    const { username, password } = req.body;
    // same as: const username = req.body.username; const password = req.body.password;

    if (!username || !password) {
        return res.redirect('/register', { error: 'Invalid username or password' })
    }

    User.create({ username, password })
        .then(createdUser => {
            res.locals.id = createdUser._id;
            return next();
        })
        .catch(err => next(err));
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
    // check for OAuth query string
    console.log('Req.query', req.query)
    if (req.query.error === 'access_denied') {
        console.log('user rejected access');
        return res.redirect('/');
    }

    // write code here
    const { username, password } = req.body;

    if (username === '' || password === '') {

        return res.redirect('/login');
    }

    User.findOne({ username: username })
        .then((user) => {
            // Validate password  
            if (!user) return res.redirect('/register');// if user doesn't exist

            user.comparePassword(password, function (err, isMatch) {
                if (err) return res.redirect('/register');  // if error, return early to redirect
                if (!isMatch) return res.redirect('/register'); // if passwords don't match
                res.locals.id = user._id; // otherwise, store hashed password and overwrite plain text password
                return next();
            })

        })
        .catch(err => next(err));
};



module.exports = userController;