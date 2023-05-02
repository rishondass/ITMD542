const fs = require('fs');
const mongoose = require('mongoose');


//initializes the database by reading the Json file and if it doesn't exists it creates one
const initDatabase = () => {
  
    try{
        const con = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(()=>{
            console.log(`Connected to db: ${mongoose.connection.host}`);
        })
    }catch(err){
        console.error(err);
    }
}


exports.initDatabase = initDatabase;
