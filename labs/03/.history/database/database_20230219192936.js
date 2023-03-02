const fs = require('fs')
var data = [];

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
                data = JSON.parse(data);
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

const saveData = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json',data, function (err) {
            if (err)
                reject(err);
            resolve();
        });
    });
    
}

exports.initDatabase = initDatabase;
exports.saveData = saveData;
exports.data = data;
