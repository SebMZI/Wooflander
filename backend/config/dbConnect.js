const mongoose = require('mongoose')

const connect = async () => {
    try{
        const mongoConnect = await mongoose.connect(process.env.DATABASE_URI)
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error in dbConnect: ", err);
    }
}

module.exports = connect