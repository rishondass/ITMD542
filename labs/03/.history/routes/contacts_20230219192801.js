var express = require('express');
var router = express.Router();
var {saveData} = require("../database/database");

router.get('/', function(req, res, next) {
    res.render('contacts');
});

router.post('/createContact', (req,res,next) => {
    console.log(req.body);
    saveData(req.body)
    .then(()=>{
        console.log('saved data successfully');
    })
    .catch(()=>{
        
    })
    res.sendStatus(200);
});

module.exports = router;