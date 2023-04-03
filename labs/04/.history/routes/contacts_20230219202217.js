var express = require('express');
var router = express.Router();
var database = require("../database/database");

router.get('/', function(req, res, next) {
    res.render('contacts', {contactsData : database.contactsData});
});

router.post('/createContact', (req,res,next) => {
    var temp = req.body;
    temp["contactID"] = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(5).toString().replace(".", ""));
    temp["date"] = Date.now();
    database.contactsData.push(req.body);
    database.saveData(database.contactsData)
    .then(()=>{
        console.log('saved data successfully');
        res.status(200).redirect('/contacts');
    })
    .catch(()=>{
        console.log('failed');
        res.sendStatus(505);
    })
    
});

router.post('/deleteContact', (req,res,next)=>{
    const id = req.body.ID;

    for(var i = 0; i < database.contactsData.length; i++){
        if(database.contactsData[i].contactID == id){
            this.delete 
        }
    }

});

module.exports = router;