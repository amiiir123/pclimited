require("dotenv").config();
const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const connectionDb = require("../config/db");
const app = express();
//import
const csvParser = require("csv-parser");
//
connectionDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middel
const verifyLogin = require("../middleware/verify.token");
// Set the view engine to EJS
app.set("view engine", "ejs");

app.use(expressLayout);
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(methodOverride("_method"));

/*
  app.get('/testt2',(req,res)=>{
    res.sendFile(__dirname +'http://127.0.0.1:5500/index.html')
  }) */
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 20 * 60 * 1000, // 10 minutes
    }, // Set secure: true if using https
  })
);
// Render the dashboard

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

//database model require
const { Blog, categoryy } = require("../models/blog.md");
const { findOne } = require("../models/user.md");
const {
  Caption,
  Service,
  sectionData,
  boxData,
  quData,
  imgData,
  About,
} = require("../models/landing.md");
const { menu, menuPages, Assets, Projectss } = require("../models/utils.md");
const { find } = require("../models/company.md");
const { Company } = require("../models/company.md");
const useers = require("../models/user.md");

//database model require

app.get("/api/user-role", verifyLogin.verifyLogin, (req, res) => {
  const user = req.user;
  res.json({ role: user.role });
});

app.get(
  "/projects",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const Projects = await Projectss.find({});
    const categories = await categoryy.find({ isActive: true });

    res.render("projects", {
      Projects,
      user: req.user,
      categories,
      isProjects: true,
    });
  }
);

app.get(
  "/assetss",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  (req, res) => {
    res.render("assets", { user: req.user, isEditLandingPage: true });
  }
);

app.get("/dashboard", verifyLogin.verifyLogin, (req, res) => {
  res.render("index", { title: "Admin Dashboard", user: req.user });
});
//blog

app.get(
  "/all-blog",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 5;
    const skip = (page - 1) * itemsPerPage;

    try {
      const totalItems = await Blog.countDocuments();
      const blogs = await Blog.find()
        .skip(skip)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 });

      res.render("all-blog", {
        user: req.user,
        isAllBlogPage: true,
        blogs,
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
app.get(
  "/add-blog",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const categories = await categoryy.find({});
    const queryString = req.url.split("?")[1];
    
    let blog = await Blog.findOne({ _id: queryString });
    if (blog == null) {
      blog = {};
    }
    res.render("add-blog", { categories, blog, isSnow: true, user: req.user });
  }
);
app.get(
  "/add-blog/:id",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const categories = await categoryy.find({});
    const blog = req.params.id;
    //
    res.render("add-blog", { categories, blog, isSnow: true, user: req.user });
  }
);

//blog
app.get("/index.html", verifyLogin.verifyLogin, (req, res) => {
  return res.redirect("/app/dashboard");
});
app.get("/index", verifyLogin.verifyLogin, (req, res) => {
  return res.redirect("dashboard");
});
app.get("/", verifyLogin.verifyLogin, (req, res) => {
  res.render("index", { title: "Admin Dashboard", user: req.user });
});

//categories
/*
app.get('/categors',async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 5;
    const skip = (page - 1) * itemsPerPage;

    try {
        const totalItems = await categoryy.countDocuments();
        const categories = await categoryy.find().skip(skip).limit(itemsPerPage);
        
        res.render('categorys', {
            categories,
            currentPage: page,
            totalPages: Math.ceil(totalItems / itemsPerPage)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


})*/
//landing

app.get("/sectionData", async (req, res) => {
  const sectionDatas = await sectionData.find();
  res.status(200).json({ sectionDatas });
});
app.get(
  "/landing",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const captions = await Caption.find();
    const services = await Service.find();
    const sectionDatas = await sectionData.find();
    const boxDatas = await boxData.find();
    const quDatas = await quData.find();
    const Abouts = await About.find();
    
    res.render("edit-landing", {
      captions: captions,
      services: services,
      sectionDatas,
      boxData: boxDatas,
      quData: quDatas,
      About: Abouts,
      isEditLandingPage: true,
      user: req.user,
    });
  }
);

app.post("/admin/update", verifyLogin.verifyLogin, async (req, res) => {
  const { id, title, description, features } = req.body;
  let featuress = JSON.parse(features);
  await Service.findByIdAndUpdate(id, {
    title: title,
    description: description,
    $set: { features: featuress },
  });
  res.redirect("/app/landing");
});

app.post(
  "/:variable/update",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const variable = req.params.variable;
    if (variable == "section") {
      const { id, title, description, smtitle, link, keywordsArray } = req.body;
      
      let keywordsArrayParsed;
      if (keywordsArray) {
        keywordsArrayParsed = JSON.parse(keywordsArray);
      } else {
        
        keywordsArrayParsed = ["null", "xxs"];
      }

      await sectionData.findByIdAndUpdate(id, {
        title: title,
        description: description,
        smtitle: smtitle,
        link: link,
        $set: { ValueOp: keywordsArrayParsed },
        // how to modefy value exist problem
      });
    } else if (variable == "box") {
      const { id, iClass, title, description, features } = req.body;
      let featuress = JSON.parse(features);
      await boxData.findByIdAndUpdate(id, {
        iClass: iClass,
        title: title,
        description: description,
        $set: { features: featuress },
      });
    } else if (variable == "qu") {
      
      const { id, title, author, description } = req.body;
      await quData.findByIdAndUpdate(id, {
        title: title,
        author: author,
        description: description,
      });
    } else if (variable == "caption") {
      const { id, title, description, Bcaption } = req.body;
      await Caption.findByIdAndUpdate(id, {
        title: title,
        description: description,
        Bcaption: Bcaption,
      });
    } else if (variable == "about") {
      const { id, title, description, Bcaption } = req.body;
      await About.findByIdAndUpdate(id, {
        title: title,
        description: description,
        Bcaption: Bcaption,
      });
    }
    res.redirect("/app/landing");
  }
);

app.get("/auth", verifyLogin.verifyLogin, (req, res) => {
  res.render("index", { title: "Admin Dashboard", user: req.user });
});

//register
app.get("/signup", verifyLogin.verifyNotLoggedIn, (req, res) => {
  res.render("pages-register-2", { layout: false });
});
app.get("/login", verifyLogin.verifyNotLoggedIn, (req, res) => {
  res.render("pages-login-2", { layout: false });
});
app.get("/recoverypassword", verifyLogin.verifyNotLoggedIn, (req, res) => {
  res.render("pages-recoverpw-2", { layout: false });
});
app.get("/confirm", verifyLogin.verifyNotLoggedIn, (req, res) => {
  if (!req.session.emailaddress) {
    return res.redirect("/app/recoverypassword"); // Or any other route for missing email address
  }
  res.render("pages-confirm-mail-2", {
    layout: false,
    email: req.session.emailaddress,
  });
});
app.get("/resetpass", verifyLogin.verifyNotLoggedIn, (req, res) => {
  
  if (!req.session.emailaddress) {
    return res.redirect("/app/recoverypassword"); // Or any other route for missing email address
  }

  res.render("resetpassword", {
    layout: false,
    email: req.session.emailaddress,
  });
});

//file upload
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

// Create directories if they don't exist
const imgDir = "../uploads/imgs";
const imgDir2 = "uploads/imgs";
const videoDir = "../uploads/videos";
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const uploadPath = isImage ? imgDir2 : videoDir;
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, buf) => {
      if (err) return cb(err);
      const filename = buf.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
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
    cb("Error: Images and videos only!");
  }
}
// Upload endpoint
app.post("/upload", (req, res) => {
  
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (req.file == undefined) {
      return res
        .status(400)
        .json({ success: false, message: "No file selected" });
    }
    const isImage = req.file.mimetype.startsWith("image/");
    const url = `/uploads/${isImage ? "imgs" : "videos"}/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "File uploaded",
      url: url,
      type: isImage ? "image" : "video",
    });
  });
});

function deleteOldImages(oldPaths) {
  oldPaths.forEach((oldPath) => {
    // Check if the old image path is valid and not empty
    if (oldPath) {
      fs.unlink(oldPath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }
  });
}

app.get("/img/data", async (req, res) => {
  try {
    const imgData2 = await imgData.find();
    res.json(imgData2);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get(
  "/menu-builder",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const menus = await menu.find({});
    const menusPages = await menuPages.find({});
    res.render("menu-builder", {
      services: false,
      sectionData: false,
      boxData: false,
      quData: false,
      menus,
      menusPages,
      isMenuBuilderPage: true,
      user: req.user,
    });
  }
);

app.post(
  "/menu-update/:id",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const { title, link } = req.body;
    
    const id = req.params.id;
    const oMenu = await menu.findById(id);

    oMenu.title = title;
    oMenu.link = link;

    await oMenu.save();

    res.redirect("/app/menu-builder");
  }
);
app.post(
  "/menu-delete/:id",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const id = req.params.id;
    try {
      await menu.findByIdAndDelete(id);
      res.status(200).redirect("/app/menu-builder");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
app.post(
  "/add/menu/",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const { title, link } = req.body;
    const checkMenu = await menu.findOne({ title: title });
    if (checkMenu) {
      
      return res.redirect("/app/menu-builder");
    }
    const newMenu = new menu({
      title: title,
      link: link,
    });
    await newMenu.save();
    res.status(200).redirect("/app/menu-builder");
  }
);

//profile
app.get("/login_assets", async (req, res) => {
  const logo = await Assets.findOne({ section: "logo" });
  const logo_dark = await Assets.findOne({ section: "logo-light" });
  const favicon = await Assets.findOne({ section: "favicon" });
  const login = await Assets.findOne({ section: "login" });

  res.status(200).json({ logo, logo_dark, favicon, login });
});
app.get("/favicon", async (req, res) => {
  const logo = await Assets.findOne({ section: "logo" });
  const logo_dark = await Assets.findOne({ section: "logo-light" });
  const favicon = await Assets.findOne({ section: "favicon" });

  res.status(200).json({ logo, logo_dark, favicon });
});
app.get("/currentUser", verifyLogin.verifyLogin, async (req, res) => {
  const user = await useers.findById(req.user.id);
  const logo = await Assets.findOne({ section: "logo" });
  const logo_dark = await Assets.findOne({ section: "logo-light" });
  const favicon = await Assets.findOne({ section: "favicon" });

  res.status(200).json({ user, logo, logo_dark, favicon });
});
app.get("/profile", verifyLogin.verifyLogin, async (req, res) => {
  const user = await useers.findById(req.user.id);
  

  res.render("profile", { title: "profile", user, isProfile: true });
});
//menu
//settings
app.get(
  "/settings",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyADMIN,
  async (req, res) => {
    const settings2 = await Company.find({});
    const settings = settings2[0];

    res.render("settings", { isSettings: true, settings });
  }
);
// add page

app.get(
  "/pages",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 5;
    const skip = (page - 1) * itemsPerPage;

    try {
      const totalItems = await menuPages.countDocuments();
      const pagedb = await menuPages.find().skip(skip).limit(itemsPerPage);

      res.render("add-page", {
        isPages: true,
        pages: pagedb,
        user: req.user,
        currentPage: page,
        totalPages: Math.ceil(totalItems / itemsPerPage),
      });
    } catch (err) {
      res.status(500).json({ message: " on pagination " });
    }
  }
);

app.get(
  "/page-edit",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyMANAGER,
  async (req, res) => {
    const queryString = req.url.split("?")[1];
    
    let mypage = await menuPages.findOne({ _id: queryString });
    if (mypage == null) {
      mypage = {};
    }
    res.render("page-edit", { mypage, isSnow: true, user: req.user });
  }
);

// dynamic req page
app.get("/index/:dynamicTitle", async (req, res) => {
  //this its /:dynamicTitle
  try {
    // Extract the dynamic title from the route parameters
    const { dynamicTitle } = req.params;

    // Fetch the title from MongoDB based on the dynamic title
    const titleData = await menuPages.findOne({ title: dynamicTitle });

    if (!titleData) {
      return res.status(404).send("Title not found");
    }
    let link = titleData.link;

    // Render the response dynamically
    res.render(link, { title: titleData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const importData = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 10MB file size limit
  fileFilter: function (req, file, cb) {
    checkTypeFileImported(file, cb);
  },
});

// Check file type
function checkTypeFileImported(file, cb) {
  // Allowed ext
  const filetypes = /csv|json/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images and videos only!");
  }
}
app.post(
  "/import",
  verifyLogin.verifyLogin,
  verifyLogin.VerifyADMIN,
  importData.single("dataFile"),
  async (req, res) => {
    try {
      const filePath = req.file.path;

      if (req.file.mimetype === "application/json") {
        // Handle JSON file
        
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        
        await useers.insertMany(data);
      } else if (req.file.mimetype === "text/csv") {
        // Handle CSV file
        const users = [];
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (row) => {
            users.push(row);
          })
          .on("end", async () => {
            await useers.insertMany(users);
            
          });
      } else {
        return res.status(400).send("Unsupported file type");
      }

      fs.unlinkSync(filePath); // Delete the file after processing
      res.redirect("/app/users");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error importing data");
    }
  }
);

app.use("/uploads", express.static("uploads"));

module.exports = app;
