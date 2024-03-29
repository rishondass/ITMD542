var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const bodyparser = require('body-parser');
const passportconfig = require('./middleware/passport-setup');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var quotesRouter = require('./routes/quotes');

const {initDatabase} = require('./database/database');

var app = express();
dotenv.config({path:'config.env'});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//initialize the database
initDatabase();

app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quotes', quotesRouter);

app.use("/img",express.static(path.resolve(__dirname,"public/images")));
app.use("/js",express.static(path.resolve(__dirname,"public/javascripts")));


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
