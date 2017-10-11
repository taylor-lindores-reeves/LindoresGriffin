const express = require('express'); // imports express
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoMessage = require('connect-mongo')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes/index');
const helpers = require('../helpers');
const app = express(); // runs express

//********************** STARTING DATABASE **********************\\

mongoose.Promise = global.Promise; // tells mongoose which promise library to use
require('dotenv').config({ path: 'variables.env' }); // sets VARIABLES.ENV to the db config
mongoose.connect(process.env.DATABASE, { // 'mongodb://localhost/lindoresgriffin'
    useMongoClient: true
});

mongoose.connection
        .on('error', (error) => {
            console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`); // tells you whether or not the connection to mongodb was successful
        });

//********************** DATABASE INITIALIZED **********************\\

// use flashes for warning and success messages
    app.use(flash());

// still not sure what it does
    app.use(cookieParser());

// allows you to request json format from the body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// uses sessions to store form data
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoMessage({ mongooseConnection: mongoose.connection })
    }));

// use locals object to store stuff
    app.use((req, res, next) => {
        res.locals.h = helpers;
        res.locals.flashes = req.flash();
        res.locals.user = req.user || null;
        res.locals.currentPath = req.path;
        next();
    });

// renders all static files
    app.use(express.static(path.join(__dirname, '/assets')));
    app.use(express.static(path.join(__dirname, '/')));

// sets handlebars as view engine
    app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
    app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// FINALLY GET TO OUR ROUTES
    app.use('/', routes);

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/home', (req, res) => {
        res.render('home');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/projects', (req, res) => {
        res.render('projects');
    });

    app.get('/services', (req, res) => {
        res.render('services');
    });

// custom 404 page
    app.use((req, res) => {
        res.status(404);
        res.render('404');
    });

// custom 500 page
    app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500);
            res.render('500');
    });

// sets port for express server
    app.set('port', process.env.PORT || 5000);

// listens on port 3000 and enables server to run
    app.listen(app.get('port'), () => {
        console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });

// One of our error handlers will see if these errors are just validation errors
    app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
    if (app.get('env') === 'development') {
        /* Development Error Handler - Prints stack trace */
        app.use(errorHandlers.developmentErrors);
    }

// production error handler
    app.use(errorHandlers.productionErrors);

    module.exports = app;


// TODO look into page testing
// TODO look into cross-page testing
// TODO look into logic testing
// TODO look into linting
