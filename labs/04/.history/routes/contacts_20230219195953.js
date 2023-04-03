var express = require('express');
var router = express.Router();
var database = require("../database/database");

router.get('/', function(req, res, next) {
    res.render('contacts', {contactsData : database.contactsData});
});

router.post('/createContact', (req,res,next) => {
    req.body["contactID"] = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(5).toString().replace(".", ""));
    req.body
    database.contactsData.push(req.body);
    database.saveData(database.contactsData)
    .then(()=>{
        console.log('saved data successfully');
    })
    .catch(()=>{
        console.log('failed');
    })
    res.sendStatus(200);
});

module.exports = router;