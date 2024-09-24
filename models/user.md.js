const mongoose = require('mongoose')
const validate = require('validator')
const roles = require('../utils/userRoles')
const userShema = new mongoose.Schema ({
    fullName : {
        type : String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true,
        validate:[validate.isEmail,'test email']
    },
    password:{
        type:String,
        required:true
    },
    passwordResetCode: String,
    passwordResetExpire: Date,
    passwordResetVerified: Boolean,
    token:{
        type:String
    },
    
    role:{
        type:String,
        enum:[roles.ADMIN,roles.MANAGER,roles.USER],
        default:roles.USER
    },
    mobile:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    isActive:{
        type:Boolean,
        default:true
    },
    avatar:{
        type:String,
        default:"uploads/imgs/profiles/a3f1074bd64ed593174924b1a3a64392.jpg"
    }


},
    {timestamps: true}
);
    
    // Add an index to the email field
userShema.index({ email: 1 });
    
module.exports = mongoose.model('User',userShema)