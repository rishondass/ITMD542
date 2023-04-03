const fs = require('fs')


const initDatabase = () => {
    console.log('here');
    try{
        if(fs.existsSync("./data.json")){
            fs.readFile('./config.json', 'utf8', (error, data) => {
                if(error){
                    console.log(error);
                    return;
                }
                console.log(JSON.parse(data));
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

exports.initDatabase = initDatabase;
