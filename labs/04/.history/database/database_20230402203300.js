const fs = require('fs');
const mongoose = require('mongoose');


//initializes the database by reading the Json file and if it doesn't exists it creates one
const initDatabase = () => {
    try{
        
    }catch(err){
        console.error(err);
    }
}


//saves the data into the data.json file
const saveData = (data) => {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json',data, function (err) {
            if (err){
                console.log(err);
                reject(err);
            }
            resolve();
        });
    });
    
}

exports.initDatabase = initDatabase;
exports.saveData = saveData;
