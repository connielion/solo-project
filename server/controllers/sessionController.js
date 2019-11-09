const Session = require('../models/sessionModel');
const qs = require('querystring');
const axios = require('axios');

const sessionController = {};


sessionController.verifyToken = (req, res, next) => {
    // check for OAuth query string
    console.log('Req.query.code', req.query.code)
    if (req.query.error === 'access_denied') {
        console.log('user rejected access');
        return res.redirect('/');
    } else if (req.query.code) {
        const query = {
            client_id: '23787c2316904235b6240af37c23b1e3',
            client_secret: '84d27f1ab46848de9cd4a6771b8b6849',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/callback',
            code: req.query.code
        }

        axios({
            url: 'https://api.instagram.com/oauth/access_token',
            method: 'post',
            data: qs.stringify(query)
        }).then(response => {
            //console.log("Response from IG: ", response.data.user);
            res.locals.id = response.data.user.id;
            res.cookie('ssid', response.data.user.id);
            //console.log(res.locals.id);
            return next();
        })
            .catch(err => next(err));

        //const url = 'https://api.instagram.com/oauth/access_token?' + qs.stringify(query);
        //console.log('URL: ', url);
        /*
        axios.post(url)
          .then( res => {
            console.log('Response from IG: ', res);
            
            return next()
          })
          .catch( err => {
             console.log('Catch error from axios call')
             next(err)
           });
           */
    }
}

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
    // write code here
    const cookie = req.cookies.ssid;
    //console.log(req);
    Session.findOne({ cookieId: cookie })
        .then(session => {
            //console.log('Session: ', session);
            if (!session) return res.redirect('/register')
            return next();
        })
        .catch(err => {
            //console.log('catch');
            next(err)
        });


};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
    //write code here
    //console.log('Starting session with ID: ', res.locals.id)
    const newSession = {
        cookieId: res.locals.id
    }
    Session.create(newSession)
        .then(session => {
            //console.log('Creating session: ', session);
            return next();
        })
        .catch(err => next(err));
    //next();
};

module.exports = sessionController;