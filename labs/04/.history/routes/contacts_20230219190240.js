var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('contacts');
});

router.post('/create')

module.exports = router;