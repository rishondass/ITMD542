var express = require('express');
var router = express.Router();
var database = require("../database/database");

const getContacts = (req,res) => {
    if(req.params.id){
        for(var i = 0; i < database.contactsData.length; i++){
            if(database.contactsData[i].contactID == req.params.id){
                return database.contactsData[i];
            }
        }
    }else{
        return database.contactsData;
    }
    
}

router.get('/', function(req, res, next) {
    res.render('contacts', {contactsData : database.contactsData});
});


router.get('/api/getContacts', getContacts);
router.get('/api/getContacts/:id', getContacts);



router.post('/deleteContact', (req,res,next)=>{
    const id = req.body.ID;
    var temp = [];
    for(var i = 0; i < database.contactsData.length; i++){
        if(database.contactsData[i].contactID != id){
            temp.push(database.contactsData[i])
        }
    }
    database.contactsData = temp;
    res.status(200).redirect('/contacts');
});




module.exports = router;