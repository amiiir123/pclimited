const session = require('express-session');
const asyncWrapper = require('../middleware/asyncWrraper')
const {Blog , categoryy}=require('../models/blog.md')
const {menuPages} = require('../models/utils.md')
const {Assets,Projectss} = require('../models/utils.md')
const {sectionData} = require('../models/landing.md')

const path = require('path');
const imgDir = path.join(__dirname, '../uploads/imgs'); // Path to the image directory
const normalizePath = (filePath) => path.basename(filePath).toLowerCase();


//upload fie
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');

// Create directories if they don't exist
const imgDir2 = 'uploads/imgs';
const videoDir = 'uploads/videos';
const imgL = 'uploads/imgs/landing';
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(imgL)) fs.mkdirSync(imgL, { recursive: true });

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isImage = file.mimetype.startsWith('image/');
        const uploadPath = isImage ? imgDir2 : videoDir;
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);
            const filename = buf.toString('hex') + path.extname(file.originalname);
            cb(null, filename);
        });
    }
});
const storageL = multer.diskStorage({
    destination: imgL,
    filename: async function (req, file, cb) {
      const section = req.body.section;
      const ext = path.extname(file.originalname);
      const staticFilename = section + ext;
      const existingImage = await Assets.findOne({ section });

      // If it exists, delete the previous image file
      if (existingImage) {
        const previousFilePath = `./uploads/${existingImage.filename}`;
        if (fs.existsSync(previousFilePath)) {
          fs.unlinkSync(previousFilePath); // Remove the old file
        }
      }
  
      cb(null, staticFilename);
    }
  });

  
// Initialize upload variable
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
const uploadL = multer({
    storage: storageL,
    limits: { fileSize: 10000000 }, // 10MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});


function checkFileType(file, cb) {
    // Allowed ext
    
    const filetypes = /jpeg|jpg|png|gif|mp4|webm|csv|json/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and videos only!');
    }
}
const getImageSrcsFromContent = (content) => {
    const imageSrcs = [];
    const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);
    if (imgTags) {
        imgTags.forEach(tag => {
            const srcMatch = tag.match(/src="([^">]+)"/);
            if (srcMatch) {
                imageSrcs.push(srcMatch[1]);
            }
        });
        return imageSrcs;
    }else{
        return "";
    }
};

const updBlogs = async (req, res, next) => {
    try {
        const id2 = req.params.id;
        const blog = await Blog.findById(id2);
   
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (typeof req.body.isActive === 'boolean') {
            blog.isActive = req.body.isActive;
            await blog.save();

        } else {


            upload.single('file')(req, res, async (err) => {
                const { title, description, keywords, category, content,myimg } = req.body;
             
                if (err) {
                    return res.status(400).json({ success: false, message: err.message });
                }
                if (!req.file && !myimg) {
                    return res.status(400).json({ success: false, message: 'No file selected' });
                }
                //const isImage = thub.mimetype.startsWith('image/');
                if(req.file){
                    const isImage = req.file.mimetype.startsWith('image/');
                    const url = `/uploads/${isImage ? 'imgs' : 'videos'}/${req.file.filename}`;
                    blog.thub = url ;

                }else{
                    blog.thub = myimg ;

                }

        
                
                
                // Extract image sources from old and new content
                const oldContentImages = getImageSrcsFromContent(blog.content);
                const newContentImages = getImageSrcsFromContent(content);
                // Find images that are in old content but not in new content
                const imagesToDelete = oldContentImages.filter(src => !newContentImages.includes(src));
    
                // Delete old images from the filesystem
                
                imagesToDelete.forEach(src => {
                    const filePath = path.join(imgDir, normalizePath(src));
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    } else {
                        console.warn(`File not found: ${filePath}`); // Debugging log
                    }
                });

                blog.title = title;
                blog.description = description;
                blog.keywords = keywords;
                blog.category = category;
                blog.content = content;
                await blog.save();
            })
            
        }
        
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//upload fie

//img assets///////////////////////////////////////////////////////////
const imgsLan = async (req,res)=>{
    uploadL.single('file')(req, res, async (err) => {
        if (err) {
          res.render('landing', { msg: err });
        } else {
          if (!req.file) {
            res.render('landing', { msg: 'No file selected!' });
          } else {
            // Save filename and metadata to MongoDB
            const myelement = await Assets.findOne({section:req.body.section})

            if (myelement){
                myelement.filename = req.file.filename 
                await myelement.save()                 
                res.redirect('assetss');
            }else {

                const image = new Assets({
                  filename: req.file.filename,
                  section: req.body.section
                });
                await image.save();
                res.redirect('assetss');
            }




          }
        }
      });
    






}



//img assets/////////////////////////////////////////////////////////
//img assets
//projects
const updprojetcs = async (req,res)=>{
    upload.single('file')(req, res, async (err) => {
        if (err) {
          res.render('landing', { msg: err });
        } else {
          if (!req.file && !req.body.myimg) {
            res.render('landing', { msg: 'No file selected!' });


          } else {








            if (req.body.id !='' ){
                  const myProject = await Projectss.findOne({_id:req.body.id}) 


                  if(req.file){
                      const isImage = req.file.mimetype.startsWith('image/');
                      const url = `/uploads/${isImage ? 'imgs' : 'videos'}/${req.file.filename}`;
                      myProject.filename = url ;
      
                  }else{
                      myProject.filename = req.body.myimg ;
      
                  }
                  myProject.title =  req.body.title
                  myProject.description =  req.body.description
                  myProject.type =  req.body.type
                  await myProject.save()                 
                  res.redirect('projects');
  

              }else{
                const isImage = req.file.mimetype.startsWith('image/');
                const url = `/uploads/${isImage ? 'imgs' : 'videos'}/${req.file.filename}`;
                const Newproject = new Projectss({
                    filename: url,
                    title :  req.body.title,
                    description :  req.body.description,
                    type :  req.body.type
                  });
                  await Newproject.save();
                  res.redirect('projects');

              }



            // Save filename and metadata to MongoDB

          




          }
        }
      });
    






}
const delPro = async (req,res)=>{
    const id2 = req.params.id;
    await Projectss.findByIdAndDelete(id2);
    res.redirect('/app/projects')



}








const getBlogs = async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;
    const skip = (page - 1) * itemsPerPage;

    try {
        const totalItems = await Blog.countDocuments();
        const blogs = await Blog.find().skip(skip).limit(itemsPerPage);

        res.render('blogs', {
            blogs,
            currentPage: page,
            totalPages: Math.ceil(totalItems / itemsPerPage)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
const addBlogs = async (req,res)=>{
    upload.single('file')(req, res, async (err) => {
        const {title,description,keywords,category,content} = req.body;
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        if (req.file == undefined) {
            return res.status(400).json({ success: false, message: 'No file selected' });
        }
        //const isImage = thub.mimetype.startsWith('image/');
        const isImage = req.file.mimetype.startsWith('image/');
        const thub = `uploads/${isImage ? 'imgs' : 'videos'}/${req.file.filename}`;
        const newBlog = new Blog({
            title,
            keywords,
            category,
            description,
            content,
            thub
        });
        await newBlog.save();
    })
    res.status(200).redirect('/app/all-blog')
    
}


const delBlogs = async (req,res,next) => {
    const id2 = req.params.id;
    await Blog.findByIdAndDelete(id2);
    res.sendStatus(200);

}
const addCat = async (req,res)=>{
    const {title , category} = req.body ;
    const catcheck = await categoryy.findOne({name:title}) ;
    if (catcheck){
        res.status(500).json({message:"this category "})
    }
    const newCat = new categoryy({
        name:title,
        description:category,
        isActive:true

    })
    await newCat.save()
    res.status(200).redirect('/app/categorys')

}
const getCat = async (req,res)=>{
    

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 5;
    const skip = (page - 1) * itemsPerPage;

    try {
        const totalItems = await categoryy.countDocuments();
        const categories = await categoryy.find().skip(skip).limit(itemsPerPage);
        res.render('categorys', {
            isCategorys:true,
            categories,
            
            currentPage: page,
            totalPages: Math.ceil(totalItems / itemsPerPage)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    
}
const delCat = async (req,res)=>{
    const id2 = req.params.id;
    await categoryy.findByIdAndDelete(id2);
    res.sendStatus(200);



}
const updSec = async (req,res,next)=>{
    const id2 = req.params.id;
    const sec = await sectionData.findById(id2)
    if(typeof req.body.isActive === 'boolean'){
        sec.isActive = req.body.isActive;
        await sec.save()
        res.sendStatus(200);
    }
}
const updCat = async (req,res,next)=>{
    const id2 = req.params.id;
    const cat = await categoryy.findById(id2)
    if(typeof req.body.isActive === 'boolean'){
        cat.isActive = req.body.isActive;
        await cat.save()
        res.sendStatus(200);
    }else{
        try{
            cat.name = req.body.title;
            cat.description = req.body.category;
            await cat.save()
            next()
        }catch(err){
            res.status(500).json({message:err})
        }
    }  
}






const upPage = async (req, res, next) => {
    try {
        const id2 = req.params.id;

        const mypage = await menuPages.findById(id2);
   
        if (!mypage) {
            return res.status(404).json({ message: 'Page not found' });
        }

        if (typeof req.body.isActive === 'boolean') {
            mypage.isActive = req.body.isActive;
        } else {
            const { title, description, content } = req.body;            
            const oldContentImages = getImageSrcsFromContent(mypage.content);
            const newContentImages = getImageSrcsFromContent(content);

            if(oldContentImages == newContentImages == ""){
                const imagesToDelete = oldContentImages.filter(src => !newContentImages.includes(src));
                imagesToDelete.forEach(src => {
                    const filePath = path.join(imgDir, normalizePath(src));
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    } else {
                        console.warn(`File not found: ${filePath}`); // Debugging log
                    }
                });
                
            }
        
            
            
            mypage.title = title;
            mypage.link = description;
            mypage.content = content;
        }
        
        await mypage.save();
        next();
    } catch (err) {
        res.status(500).json({ message: "  hhhhhhhhhhhhhhhhhhh sa" });
    }
};

const addpage = async (req,res)=>{
    const {title , category} = req.body ;
    const pagecheck = await menuPages.findOne({title:title}) ;
    if (pagecheck){
        res.status(500).json({message:"this page already exist "})
    }
    const newPage = new menuPages({
        title:title,
        link:category,
        isActive:false

    })
    await newPage.save()
    res.status(200).redirect('/app/pages')

}
const delPage = async (req,res)=>{
    const id2 = req.params.id;
    await menuPages.findByIdAndDelete(id2);
    res.sendStatus(200);

}














module.exports = {
    updSec,
    delPro,
    updprojetcs,
    imgsLan,
    delPage,
    delPage,
    upPage,
    addpage,
    delBlogs,
    updBlogs,
    addBlogs,
    updCat,
    delCat,
    getCat,
    getBlogs,
    addCat
}