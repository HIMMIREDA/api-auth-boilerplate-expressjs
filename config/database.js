
const mongoose = require("mongoose");

const {MONGODB_CONNECTION_URL} = process.env;

module.exports.connect = () => {
    mongoose.connect(MONGODB_CONNECTION_URL)
    .then(()=>{
        console.log("Successfully connected to database");
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    });

}


