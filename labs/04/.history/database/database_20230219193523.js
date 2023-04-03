const fs = require('fs');
var contactsData = [];

//initializes the database by reading the Json file and if it doesn't exists it creates one
const initDatabase = () => {
    console.log('here');
    try{
        if(fs.existsSync("./data.json")){
            fs.readFile('./data.json', 'utf8', (error, data) => {
                if(error){
                    console.log(error);
                    return;
                }
                if(data == "")
                    return
                contactsData = JSON.parse(data);
            });
        }else{
            fs.writeFile('data.json',"", function (err) {
                if (err) throw err;
                console.log("Data file doesn't exist, creating one...");
            });
            
        }
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
exports.contactsData = contactsData;
