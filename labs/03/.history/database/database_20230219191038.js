const fs = require('fs')

try{
    if(fs.existsSync("../data.json")){

    }else{
        fs.writeFile('data.json',"", function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
    }
}catch(err){
    console.error(err);
}