const express = require('express')
const app = express.Router()

require('dotenv').config();

const nodemailer = require('nodemailer');
const controllerUser = require('../controller/user.controller')
const controllerBlog = require('../controller/blog.controller')
const Logout = require('../controller/user.controller')
const userss  = require('../models/user.md')
//midellware
const verifyLogin = require('../middleware/verify.token')

//database
const {Blog,categoryy}=require('../models/blog.md');
const { findOne } = require('../models/user.md');
const {menu,menuPages,Assets,Projectss} = require('../models/utils.md');
const { find } = require('../models/company.md');
const {Company} = require('../models/company.md')
const useers = require('../models/user.md')
//database
const {Caption,Service,sectionData,boxData,quData,imgData,About}=require('../models/landing.md');
//database


app.get('/newsPost/:id',async (req,res)=>{
  const post = await Projectss.findOne({_id:req.params.id})
  res.status(200).json({post})

})

app.post('/contactForm', async (req, res) => {
  const { email, phone, message } = req.body;

  if (!email || !phone || !message) {
      return res.status(400).send('All fields are required.');
  }

  try {
      // Send an email notification
      const mailOptions = {
          from: '"Your Website Contact Form" <your-email@example.com>', // sender address
          to: 'salah9azhary9@gmail.com', // list of receivers
          subject: 'New Contact Form Submission', // Subject line
          html: `
              <h3>New Contact Message</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong> ${message}</p>
          `
      };

      // Send email using nodemailer
      await transporter.sendMail(mailOptions);
      

      res.status(200).send('Thank you for your message! We will get back to you soon.');
  } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
  }
});


app.get('/contact_Data',async (req,res)=>{

  const comInfo = await Company.find({})
  res.json({comInfo})




    
})


app.get('/contact',(req,res)=>{
  res.render('./frontend/contact',{isContact:true})
})



app.get('/projects_Data',async (req,res)=>{
  const projects = await Projectss.find({})
  const category = await categoryy.find({isActive: true})

  res.status(200).json({projects,category})



})
app.get('/projects',async (req,res)=>{

  res.status(200).render('./frontend/projects',{isProjects:true})



})



app.get('/post/:id',async (req,res)=>{
  const post = await Blog.findById(req.params.id)
  
  const blogg = await Blog.find({isActive: true}).limit(3).sort({ createdAt: -1 })
  const category = await categoryy.find({isActive: true})

  res.status(200).json({post,blogg,category})



})
app.get('/blog/:id',async (req,res)=>{
  const post = await Blog.findById(req.params.id)
  
  res.render('./frontend/blog-post',{post,isPost:true})


})


app.get('/imgs',async (req,res)=>{
  const Assetss = await Assets.find({})
  res.status(200).json({Assetss})
})

app.get('/blogs',async (req,res)=>{
  res.render('./frontend/blog-grid',{isBlogs:true})
})
app.get('/index',async (req,res)=>{
    const captionss = await Caption.find({})
    const Assetss = await Assets.find({})
    res.render('./frontend/index',{captions:captionss,Assetss,isIndex:true})
  })

app.get('/data',async (req,res)=>{
  const allBlog = await Blog.find({isActive:true}).sort({ createdAt: -1 })
  const blogg = await Blog.find({isActive:true}).limit(3).sort({ createdAt: -1 })

  const sectionDataa = await sectionData.find({})
  const boxDataa = await boxData.find({})
  const boxDataa2 = await boxData.find({}).limit(3)
  const quDataa = await quData.find({})
  const servicee = await Service.find({})
  const Abouts = await About.find({})
  const Assetss = await Assets.find({})

  res.status(200).json({sectionData : sectionDataa,boxData:boxDataa,quData:quDataa,Blog:allBlog,About:Abouts,serviceData:servicee,Assetss , allblg:allBlog,boxDataa2})

})

//menu
app.get('/menus_footer',async (req,res)=>{
  const menus = await menu.find({});
  const footer = await Company.find({})
  res.status(200).json({menu:menus ,footer})

})
app.get('/about',async (req,res)=>{


  res.render('./frontend/About',{isAbout:true})
})
app.get('/',(req,res)=>{
  res.redirect('/index')
})
app.use('/uploads', express.static('uploads'));
//probleme of fetch other requestion from tha frontend : app.get('*', (req, res) => {res.status(404).render('./frontend/404');});



module.exports = app




