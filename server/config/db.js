const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.NODE_DB);
        console.log("CONNECTED TO DB");
    }catch(err){
        console.log("Error when connect to db");
        console.log(err);
    }
}

module.exports=connectDB;