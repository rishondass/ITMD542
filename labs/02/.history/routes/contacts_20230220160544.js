var express = require('express');
var router = express.Router();
var database = require("../database/database");
const {body, validationResult} = require('express-validator');

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
router.get('/:id', (req,res,next)=>{
    res.render("viewContact", {contactsData : getContacts(req,res)});
});

router.get("/edit/:id", (req,res,next)=>{
    if(req.params.id){
        res.render('contactEdit', {contactsData : getContacts(req,res)})
    }
});


router.post('/createContact', (req,res,next) => {
    var temp = req.body;
    temp["contactID"] = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(5).toString().replace(".", ""));
    temp["date"] = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    database.contactsData.push(temp);
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

router.post('/deleteContact/:id', (req,res,next)=>{
    console.log('here')
    if(req.params.id){
        const id = req.params.id;
        var temp = [];
        for(var i = 0; i < database.contactsData.length; i++){
            if(database.contactsData[i].contactID != id){
                temp.push(database.contactsData[i])
            }
        }
        database.contactsData = temp;
        res.status(200).redirect('/contacts');
    }else{
        res.sendStatus(500);
    }
    
});

router.post('/editContact', (req,res,next)=>{
   
    if(req.body.contactID){
        var temp = req.body;
        for(var i = 0; i < database.contactsData.length; i++){
            if(req.body.contactID == database.contactsData[i].contactID){
                temp["date"] = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                database.contactsData[i] = temp;
                res.status(200).redirect(`/contacts/${database.contactsData[i].contactID}`);
                break;
            }
        }
    }else{
        res.sendStatus(500);
    }
});





module.exports = router;