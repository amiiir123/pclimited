const mongoose = require('mongoose');
const { boxData } = require('./landing.md');



const menuSchema = new mongoose.Schema({
    title:String,
    link:String
    
})
const menuPagesSchema = new mongoose.Schema({
    title:String,
    link:String,
    content: {
        type:String,
        default:""
    },
    isActive:{
        type:Boolean,
        default:false
    }
    
})
const MessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },

})

const assetsLanSchema = new mongoose.Schema({
    filename: String,
    section: String, 
    uploadDate: { type: Date, default: Date.now }
  

})
const assetsProject = new mongoose.Schema({
    filename: String,
    title: String, 
    type:String,
    description:String,
    
    uploadDate: { type: Date, default: Date.now }
  

})

const userSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    colorScheme: { type: String, enum: ['light', 'dark'], default: 'light' },
    sidebarTheme: { type: String, enum: ['default', 'dark'], default: 'default' }
});

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);








const Message = mongoose.model('Message', MessageSchema);
const menu = mongoose.model('menu', menuSchema);
const menuPages = mongoose.model('menuPages', menuPagesSchema);
const Assets = mongoose.model('assetsLan', assetsLanSchema);
const Projectss = mongoose.model('Projectss', assetsProject);

module.exports  = {
    UserSettings,
    Projectss,
    Assets,
    Message,
    menu,
    menuPages
}