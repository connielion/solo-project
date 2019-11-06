const path = require('path');
const express = require('express');
const app = express();

require('dotenv').config();
// need to go back and uncomment module.exports = router, write route handlers
const apiRouter = require('./routes/api');

const PORT = 3000;

app.use(express.json());
//middleware
app.use(express.urlencoded({ extended: false }));

//static folder
app.use(express.static(path.join(__dirname, '/src')))

app.use('/api', apiRouter)
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../src/index.html')))

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