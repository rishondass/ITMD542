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

const updateContacts = () => {
    database.db.all("SELECT * FROM Contacts;", function(err, rows) {
        database.contactsData
    });
}

router.get('/', function(req, res, next) {
    database.db.all("SELECT * FROM Contacts;", function(err, rows) {
        res.render('contacts', {contactsData : rows, msg: ""});
    });	
    
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
        
        database.saveData(temp)
        .then(()=>{
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
        database.editData(database.contactsData)
        .then(()=>{
            console.log('saved data successfully');
            res.status(200).redirect(`/contacts/${temp.contactID}`);
        })
        .catch(()=>{
            console.log('failed');
            res.sendStatus(505);
        })
        // for(var i = 0; i < database.contactsData.length; i++){
        //     if(req.body.contactID == database.contactsData[i].contactID){
                
        //         database.contactsData[i] = temp;
                
        //         break;
        //     }
        // }
    }else{
        res.sendStatus(500);
    }
});





module.exports = router;