// Initialise express
const express = require('express');
const app = express();

// Initialise express-session
const session = require('express-session');

// Initialise body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Initialise http
const server = require('http').Server(app);

// Tell express where static files are kept
app.use(express.static(__dirname + '/public'));

// Start the app on port 3000 in development mode, or use an environment specified port in production mode
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'));

/** Environment variables */

var env = {};
try {
    let localEnv = require('./env-local.json');

    env.sessionSecret = localEnv.SESSION_SECRET;

    console.log("Loaded Local Auth");
} catch (e) {
    console.log("Failed to open Local Auth");
}

/** Authentication */

app.use(session({
    secret: env.sessionSecret || process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

/** Web Pages */

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/using-paradox', function (req, res) {
    res.sendFile(__dirname + '/public/using-paradox.html');
});

app.get('/privacy-policy', function (req, res) {
    res.sendFile(__dirname + '/public/privacy-policy.html');
});


