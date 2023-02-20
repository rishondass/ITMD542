var express = require('express');
var router = express.Router();
var {saveData} = require("../database/database");

router.get('/', function(req, res, next) {
    res.render('contacts');
});

router.post('/createContact', (req,res,next) => {
    console.log(req.body);
    
    res.sendStatus(200);
});

module.exports = router;