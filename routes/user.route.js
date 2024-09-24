const express = require('express')
const router = express.Router()
const controllerUser = require('../controller/user.controller')
const controllerBlog = require('../controller/blog.controller')
const Logout = require('../controller/user.controller')
const userss  = require('../models/user.md')
const {Assets,Projectss} = require('../models/utils.md')
//midellware




const verifyLogin = require('../middleware/verify.token')
router.route('/register-page').post(controllerUser.register)
router.route('/login-page').post(controllerUser.login)
router.get('/logout' ,Logout.Logout);

router.route('/auth/recoverypassword')
.post(controllerUser.forogotPassword)

router.post('/auth/confirm', controllerUser.verifyPassResetCode);
router.post('/auth/resetPassword', controllerUser.resetPassword);

router.post('/deletePro/:id',controllerBlog.delPro)
router.post('/projectss',controllerBlog.updprojetcs)
router.get('/projectss/:id', async (req, res) => {
  try {
    
    // Fetch the image from the Assets collection in MongoDB
    const project = await Projectss.findOne({ _id: req.params.id });

    if (project) {
      res.json({ 
        project 
      }); // Send back the image URL
    } else {
      res.json({ filename: null }); // No image found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving image' });
  }
});

router.post('/imgslan',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.imgsLan)
router.get('/get-image/:caption',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER, async (req, res) => {
  try {
    const { caption } = req.params;
    
    // Fetch the image from the Assets collection in MongoDB
    const asset = await Assets.findOne({ section: caption });

    if (asset) {
      res.json({ imgUrl: asset.filename }); // Send back the image URL
    } else {
      res.json({ imgUrl: null }); // No image found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving image' });
  }
});


router.get('/categorys',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.getCat)
router.post('/cat/delete/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.delCat)
router.post('/cat/update/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.updCat,(req,res)=>{
    res.redirect('/app/categorys')
    
})
router.post('/section/update/:id',verifyLogin.verifyLogin,verifyLogin.VerifyADMIN,controllerBlog.updSec)
router.post('/add/category',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.addCat)
//update users inf
router.post('/Upser',verifyLogin.verifyLogin,controllerUser.updUser) // role admin
router.post('/Upserav',verifyLogin.verifyLogin,controllerUser.upduserAvatar) 
router.post('/user/delete/:id',verifyLogin.verifyLogin,verifyLogin.VerifyADMIN,controllerUser.delUser) // verify role admoin
//

router.post('/add/event',controllerUser.addEvent)
router.get('/get/event',controllerUser.getEvent)

router.post('/delete/blog/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.delBlogs)
router.get('/get/blog',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.getBlogs)
router.post('/add/blog',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.addBlogs)
router.post('/update/blog/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.updBlogs,(req,res)=>{
    res.redirect('/app/all-blog')})
    
    
    
router.post('/pages/delete/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.delPage)
router.post('/add/pages',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.addpage);
router.post('/pages/update/:id',verifyLogin.verifyLogin,verifyLogin.VerifyMANAGER,controllerBlog.upPage,(req,res)=>{
    res.redirect('/app/pages')});

//company
router.post('/save-company',verifyLogin.verifyLogin,verifyLogin.VerifyADMIN, controllerUser.updCompany);
//


//exports and import
router.get('/export',verifyLogin.verifyLogin,verifyLogin.VerifyADMIN,controllerUser.exportss)
//exports and import
router.get('/users',verifyLogin.verifyLogin,verifyLogin.VerifyADMIN,controllerUser.getUsers)
router.get('/users-chat',controllerUser.getUsers2)

// chat 
router.get('/chat',verifyLogin.verifyLogin, async (req, res) => {
  res.render('apps-chat', { user: req.user , isChat:true });
});

//router.post('/users-chat/:userId',controllerUser.getMessage)
  //messages
router.route('/messages/:userId')
  .get(verifyLogin.verifyLogin,controllerUser.getMessage)
router.post('/sendMessage',verifyLogin.verifyLogin,controllerUser.sendMessage);
  
  // Send a message
router.get('/area1',verifyLogin.verifyLogin,controllerUser.getMusers)
//router.get('/getMsent',verifyLogin.verifyLogin,controllerUser.getMsent)

const {UserSettings} = require('../models/utils.md');


// Route to get user settings
router.get('/themesettings', verifyLogin.verifyLogin, async (req, res) => {
  console.log("ccccccccccccccccc",req.user.id)
    const userId = req.user.id;  // Assuming req.user contains the logged-in user's info
    try {
        const settings = await UserSettings.findOne({ userId });
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user settings' });
    }
});

// Route to update user settings
router.post('/themesettings/updatee', verifyLogin.verifyLogin, async (req, res) => {
    const userId = req.user.id;
    const { colorScheme } = req.body;
    console.log("wwelcommme")
        try {
        const settings = await UserSettings.findOneAndUpdate(
            { userId },
            { colorScheme },
            { new: true, upsert: true }  // Create new settings if they don't exist
        );
        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user settings' });
    }
});

// Route to reset settings to default
router.post('/themesettings/reset', verifyLogin.verifyLogin, async (req, res) => {
    const userId = req.user.id;

    try {
        const defaultSettings = { colorScheme: 'light'};
        const settings = await UserSettings.findOneAndUpdate(
            { userId },
            defaultSettings,
            { new: true, upsert: true }
        );
        res.status(200).json({ message: 'Settings reset to default', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting user settings' });
    }
});






router.use('/uploads', express.static('../uploads'));

module.exports = router