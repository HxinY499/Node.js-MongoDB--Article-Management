var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./db.js")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var workRouter = require("./routes/work")
var session = require("express-session")
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 10 * 60 }
}))

app.get('*', function(req, res, next) {
    var username = req.session.username
    var path = req.path
    console.log("session======" + username)
    if (path != "/login" && path != "/register") {
        if (!username) {
            return res.redirect("/login")
        }
    }
    next()
})
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/work', workRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;