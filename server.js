var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_v4bv3vzl:658hbscpcrm4orcqhe9goeud53@ds235418.mlab.com:35418/heroku_v4bv3vzl');


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    var allowedOrigins = ['https://evening-thicket-43962.herokuapp.com', 'http://localhost:4200'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});




var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/message/:theMessage', function (req, res) {
    var theMessage = req.params['theMessage'];
    res.send(theMessage);
})

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}



var userService = require('./services/user.service.server');
userService(app);

var questionService = require('./services/question.service.server');
questionService(app);

var quizService = require('./services/quiz.service.server');
quizService(app);

var sectionService = require('./services/section.service.server');
sectionService(app);

app.listen(process.env.PORT || 4000);