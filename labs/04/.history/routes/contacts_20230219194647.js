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
    var data = [
        {
            firstName: 'Rishon',
            lastName: 'Dass',
            email: 'rishondass01@gmail.com',
            notes: 'asds'
        },
        {
            firstName: 'Mike',
            lastName: 'Ike',
            email: 'rishondass03@gmail.com',
            notes: 'asd'
        }
    ]
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