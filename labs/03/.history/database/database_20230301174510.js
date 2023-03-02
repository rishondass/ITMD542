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

        const sql = `SELECT * FROM Contacts;`
        db.all(sql, [], (err,rows)=>{
            if(err) console.log(err.message);
        })
        
    }catch(err){
        console.error(err);
    }
}


//saves the data into the data.json file
const saveData = (data) => {
    //console.log(data);
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Contacts (contactID,firstName,lastName,email,notes,date)
            Values(?,?,?,?,?,?)
            `;

            db.run(sql,[data.contactID,data.firstName,data.lastName,data.email,data.notes,data.date],(err)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                console.log("data added successfully");
                resolve();
            });
    });
    
}

exports.initDatabase = initDatabase;
exports.saveData = saveData;
exports.db = db;