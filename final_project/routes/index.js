var express = require('express');
var router = express.Router();
const {quoteDB} = require('../model/model.js');
const passport = require('passport');

const isLoggedIn = (req,res,next) =>{
  if(req.user){
      next();
  }else{
      res.redirect("/login");
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/login', function(req, res, next) {
  res.render('login', {errorMessage: ''});
});

router.get('/logout',isLoggedIn, function(req, res, next) {
  req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local',{
  successRedirect: "/home",
  failureRedirect: "/login?error=1",
}));

router.get('/home',isLoggedIn, function(req, res, next) {
  quoteDB.find()
  .then(data=>{
    res.render('home', {quotes: data});
  })
  .catch(()=>{
    console.log('failed');
    res.sendStatus(505);
  });
  
});

module.exports = router;

