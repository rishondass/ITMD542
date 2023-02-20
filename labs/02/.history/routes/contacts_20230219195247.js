var express = require('express');
var router = express.Router();
var database = require("../database/database");

router.get('/', function(req, res, next) {
    console.log(database.contactsData);
    res.render('contacts', {contactsData : database.contactsData});
});

router.post('/createContact', (req,res,next) => {
    console.log(req.body);
    //database.contactsData.append(req.body);
    var data = database.contactsData;
    console.log(data)
    data.append(req.body);
    database.saveData(data)
    .then(()=>{
        console.log('saved data successfully');
    })
    .catch(()=>{
        console.log('failed');
    })
    res.sendStatus(200);
});

module.exports = router;