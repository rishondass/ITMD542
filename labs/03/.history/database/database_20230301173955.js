const fs = require('fs');
const sql = require('sqlite3').verbose();



//Creates a connection to the database
const db = new sql.Database("./data.db", sql.OPEN_READWRITE, (err)=>{
    if(err)
        return console.error(err.message);
    console.log('db connection successful');
});

//initializes the database by reading the Json file and if it doesn't exists it creates one
const initDatabase = () => {
    try{
        db.run("CREATE TABLE IF NOT EXISTS Contacts(contactID,firstName,lastName,email,notes,date);");
        
    }catch(err){
        console.error(err);
    }
}


//saves the data into the data.json file
const saveData = (data) => {
    //console.log(data);
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {

        try{
            const sql = `INSERT INTO Contacts (contactID,firstName,lastName,email,notes,date)
            Values(?,?,?,?,?,?)
            `;

            db.run(sql,(data.firstName,data.lastName,data.email,data.))
        }catch(err){

        }
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
exports.db = db;