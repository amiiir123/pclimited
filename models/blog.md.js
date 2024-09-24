const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    keywords: String,
    description: String,
    content: {
        type:String,
        default:""
    },
    thub :{
        type:String,
        default:""

    },
    isActive: {
        type: Boolean,
        default: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
},
{ timestamps: true }

);

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    isActive: Boolean
});

const Blog = mongoose.model('Blog', blogSchema);
const categoryy = mongoose.model('category', categorySchema);

module.exports = {
    Blog,
    categoryy
};
