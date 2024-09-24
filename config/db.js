const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectionDb = async(req,res)=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("sucees connnection", conn.connection.host)

    }catch (err){
        console.log(err)

    }
}
module.exports = connectionDb
