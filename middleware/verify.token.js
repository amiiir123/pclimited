const jwt = require('jsonwebtoken');
const getBaseUrl = require('../utils/getBaseurl')

const verifyLogin = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) return res.redirect(`${getBaseUrl(req)}/login`);
    
    jwt.verify(token, process.env.JWT_SECRET_KEY , (err, user) => {
        if (err) return res.redirect(`${getBaseUrl(req)}/login`);
        req.user = user;
        console.log("verfy login : ",req.user)
        next();
    });

};
const verifyNotLoggedIn = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (!err) {
                // User is already logged in
                return res.redirect(`${getBaseUrl(req)}/dashboard`);
            }
        });
    }else{
        next();

    }
};

const  VerifyADMIN = (req, res, next) =>{
    try {
        const user = req.user; // we have access to the user object from the request
        const { role } = user; // extract the user role
        console.log("ttttttttttttttt ",role)
        if (role !== "ADMIN") {
            return res.status(401).json({
                status: "failed",
                message: "You are not authorized to view this page.",
            });
        }
        next(); // continue to the next middleware or function
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}
const  VerifyMANAGER = (req, res, next) =>{
    try {
        const user = req.user; 
        const { role } = user; 
        console.log("ttttttttttttttt ",role)
        if (role == "ADMIN" || role == "MANAGER" ) {
            return next();
        }
        return res.status(401).json({
            status: "failed",
            message: "You are not authorized to view this page.",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        });
    }
}

  
module.exports = {verifyLogin,verifyNotLoggedIn,VerifyADMIN,VerifyMANAGER};
