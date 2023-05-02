var express = require('express');
var router = express.Router();
const {quoteDB} = require('../model/model.js');
const isLoggedIn = (req,res,next) =>{
  if(req.user){
      next();
  }else{
      res.redirect("/login");
  }
}

router.get('/')

router.post('/create',isLoggedIn, function(req, res, next) {
  console.log(req.body);
  const tempQuote = quoteDB(req.body);
  tempQuote.save(tempQuote)
  .then(data=>{
    console.log('saved data successfully');
    res.status(200).redirect('/home');
  })
  .catch(()=>{
    console.log('failed');
    res.sendStatus(505);
  });
});

router.post('/delete/:id',isLoggedIn,(req,res,next)=>{
  if(req.params.id){
    quoteDB.deleteOne({_id:req.params.id})
    .then(data=>{
      console.log('sucessfully deleted data');
      res.status(200).redirect('/home');
    })
    .catch(()=>{
      console.log('failed');
      res.sendStatus(505);
    });
  }else{
    res.sendStatus(505);
  }
});

router.get('/edit/:id',isLoggedIn,(req,res,next)=>{
  if(req.params.id){
    quoteDB.find({_id:req.params.id})
    .then(data=>{
      res.render('editquote', {quote: data[0]});
    })
    .catch(()=>{
      console.log('failed');
      res.sendStatus(505);
    });
  }
  
});

router.post('/edit/:id',isLoggedIn,(req,res,next)=>{
  if(req.params.id){
    quoteDB.updateOne({_id:req.params.id},{
      $set: req.body
    })
    .then(data=>{
      console.log('saved data successfully');
      res.status(200).redirect('/home');
    })
    .catch(()=>{
      console.log('failed');
      res.sendStatus(505);
    });
  }
});



module.exports = router;