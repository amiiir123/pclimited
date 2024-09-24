const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    title: String,
    description: String,
    iClass:{
        type: String,
        default:""
    },
    features: [String]
});
const captionSchema = new mongoose.Schema({
    title: String,
    description: String,
    Bcaption:String
});
const sectionDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    smtitle:String,
    ValueOp :{
        type:[String],
        default:[""]
    },
    sectionName:String,
    link:{
        type:String,
    },
    isActive:Boolean
});


const boxDataSchema = new mongoose.Schema({
    iClass : String,
    title: String,
    description: String
});
const quDataSchema = new mongoose.Schema({
    title: String,
    author:String,
    description: String
});
const imgDataSchema = new mongoose.Schema({
    images:[String]
 })

const Caption = mongoose.model('Caption', captionSchema);
const About = mongoose.model('About', captionSchema);
const Service = mongoose.model('Service', servicesSchema);
const sectionData = mongoose.model('sectionData', sectionDataSchema);
const boxData = mongoose.model('boxData', boxDataSchema);
const quData = mongoose.model('quData', quDataSchema);
const imgData = mongoose.model('imgData', imgDataSchema);

module.exports = {
    About,
    Caption,
    Service,
    sectionData,
    boxData,
    quData,
    imgData
};
