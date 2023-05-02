var express = require('express');
var router = express.Router();
const {userDB} = require('../model/model.js');
const bcrypt = require('bcrypt');
const isLoggedIn = (req,res,next) =>{
  if(req.user){
      next();
  }else{
      res.redirect("/login");
  }
}

/* GET users listing. */
router.get('/add_login',isLoggedIn, function(req, res, next) {
  res.render('createlogin');
});

router.post('/create_login',isLoggedIn, async (req, res, next)=>{
  var password = 'default';
  if(req.body.password == req.body.confirmPassword){
    password = await bcrypt.hash(req.body.username,10);
  }else{
    res.send(`password doesn't match`);
  }
  var temp = {
    username : req.body.username,
    password: password
  }
  const tempUser = userDB(temp)
  tempUser.save(tempUser)
  .then(data=>{
    console.log('saved data successfully');
    res.status(200).redirect('/home');
  })
  .catch(()=>{
    console.log('failed');
    res.sendStatus(505);
  });
});

module.exports = router;
