const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');
//const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();
const apiRouter = require('./routes/api');
const PORT = 3000;
const cookieController = require('./controllers/cookieController');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
// PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//SESSION
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}))

//DB
const mongoURI = process.env.DB_URI;
// console.log(`MONGO URI`, mongoURI)
mongoose.connect(mongoURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'pokedex'
}).then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));


// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static('.'));
app.use('/pokemon', apiRouter)
// passport.use(new FacebookStrategy({
//     clientID: process.env.APP_ID,
//     clientSecret: process.env.APP_SECRET,
//     callbackURL: 'http://localhost:3000/auth/facebook/callback'
// },
//     function (accessToken, refreshToken, profile, done) {
//         console.log(profile)
//     }
// ))



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'))
})

// DB
// mongoose.connect('mongodb://localhost/pokedex');
// const db = mongoose.connection;
// app.post('/auth/facebook', passport.authenticate('facebook'))
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     console.log(req.user);
//     res.redirect('/favs')
// })

//AUTH
app.get('/oauth', (req, res) => {
    const queryString = {
        client_id: '23787c2316904235b6240af37c23b1e3',
        redirect_uri: 'http://localhost:3000/callback'
    }
    res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' +
        queryString.client_id +
        '&redirect_uri=' +
        queryString.redirect_uri +
        '&response_type=code')
});

app.get('/callback', sessionController.verifyToken, sessionController.startSession, (req, res) => {
    res.redirect('/pokemons');
})


app.post('/register', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    // what should happen here on successful sign up?
    res.redirect('/pokemons');
});




// ERROR HANDLERS
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {

    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occured' }
    }
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message)
});

// start server

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})

module.exports = app;