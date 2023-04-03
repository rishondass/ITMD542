var express = require('express');
var router = express.Router();
var database = require("../database/database");
const {body, validationResult} = require('express-validator');
const {contactsInfoDB} = require('../model/model.js');
const { models } = require('mongoose');

const getContacts = (req,res) => {
    var info = null;
    if(req.params.id){
        contactsInfoDB.findOne({
            contactID: req.params.id
        })
        .then(data=>{
            //console.log(data);
            info = data;
        })
    }else{
        return contactsInfoDB.find()
        .then(data=>{
            info =data;
        })
    }
    console.log(info);
    return info;
    
}

router.get('/', function(req, res, next) {
    contactsInfoDB.find()
    .then(contacts=>{
        res.render('contacts', {contactsData : contacts, msg: ""});
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occurred while trying to retrieve data"})
    })
});


router.get('/api/getContacts', getContacts);
router.get('/:id', (req,res,next)=>{
    if(req.params.id){
        //console.log(req.params.id);
        contactsInfoDB.findOne({
            contactID: req.params.id
        })
        .then(data=>{
            res.render("viewContact", {contactsData : data});
        })
    }
});

router.get("/edit/:id", (req,res,next)=>{
    if(req.params.id){
        contactsInfoDB.findOne({
            contactID: req.params.id
        })
        .then(data=>{
            res.render("contactEdit", {contactsData : data});
        })
    }
});


router.post('/',
body('firstName').trim().notEmpty(),
body('lastName').trim().notEmpty(),
body('email').isEmail(),
(req,res,next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        console.log(result.array());
        res.render('contacts',{contactsData : database.contactsData, msg : result.array()})
    }else{
        var temp = req.body;
        temp["contactID"] = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(5).toString().replace(".", ""));
        temp["date"] = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        console.log(temp);
        const tempContactInfo = contactsInfoDB(temp);
        tempContactInfo.save(tempContactInfo)
        .then(data=>{
            console.log('saved data successfully');
            res.status(200).redirect('/contacts');
        })
        .catch(()=>{
            console.log('failed');
            res.sendStatus(505);
        })
    }
    
    
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
        temp["date"] = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        // for(var i = 0; i < database.contactsData.length; i++){
        //     if(req.body.contactID == database.contactsData[i].contactID){
                
        //         database.contactsData[i] = temp;
        //         res.status(200).redirect(`/contacts/${database.contactsData[i].contactID}`);
        //         break;
        //     }
        // }
        console.log(temp);
        const tempContactInfo = contactsInfoDB(temp);
        tempContactInfo.
        tempContactInfo.save(tempContactInfo)
        .then(data=>{
            console.log('saved data successfully');
            res.status(200).redirect(`/contacts/${temp.contactID}`);
        })
        .catch(()=>{
            console.log('failed');
            res.sendStatus(505);
        })
    }else{
        res.sendStatus(500);
    }
});





module.exports = router;