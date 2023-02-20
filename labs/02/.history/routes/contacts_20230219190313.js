var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('contacts');
});

router.post('/createContact', (req,res,next) => {
    
});

module.exports = router;