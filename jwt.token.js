const jwt = require('jsonwebtoken')

module.exports = async (pyload)=>{
    const token = jwt.sign(pyload,process.env.JWT_SECRET_KEY,{expiresIn:'50m'})
    console.log(token)
    return token ; 
}