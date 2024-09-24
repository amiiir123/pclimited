let users = require("../models/user.md");
const session = require("express-session");
const { Message } = require("../models/utils.md");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/asyncWrraper");
const bcript = require("bcrypt");
const GenT = require("../jwt.token");
const jwt = require("jsonwebtoken");
const { blacklist } = require("validator");
const Blacklist = require("../models/blacklist");
const events = require("../models/event");
const sendEmail = require("../utils/sendEmail");
const saltRounds = 10;
console.log("what");


const path = require('path');


//upload
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");

// Create directories if they don't exist
const imgDir2 = "uploads/imgs";
const imgProfile = "uploads/imgs/profiles";
const videoDir = "uploads/videos";
//creation if not exist
if (!fs.existsSync(imgProfile)) fs.mkdirSync(imgProfile, { recursive: true });
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isImage = file.mimetype.startsWith("image/");
    const uploadPath = isImage ? imgProfile : videoDir;
    console.log("hhhhhhhhhhh :", uploadPath);
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

  const filetypes = /jpeg|jpg|png|gif|mp4|webm/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    console.log("okkk");
    return cb(null, true);
  } else {
    cb("Error: Images and videos only!");
  }
}

//upload

//register
const register = asyncWrapper(async (req, res, next) => {
  console.log(req.body);

  const { fullName, email, password, role } = req.body;
  console.log(fullName);

  const oldUser = await users.findOne({ email: email });
  if (oldUser) {
    //error already exist + return
    return res.status(500).json({error: 'this email already exist !'});
  }
  console.log("test");
  bcript.genSalt(saltRounds, async function (err, salt) {
    bcript.hash(password, salt, async (err, hash) => {
      const newUser = new users({
        fullName,
        email,
        password: hash,
        role,
      });
      const token = await GenT({
        email: newUser.email,
        id: newUser._id,
        role: newUser.role,
      });
      newUser.token = token;
      await newUser.save();
      return res.status(200).json({redirectUrl:"/app/login"}); //add sucess page of confirmation email
    });
  });
});
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const oldUser = await users.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ error: "User does not exist" });
    }
    if (!oldUser.isActive) {
      return res.status(404).json({ error: "Account disabled" });
    }

    // Compare the provided password with the stored hash
    bcript.compare(password, oldUser.password, async (err, isMatch) => {
      if (err) {
        return next(err);
      }

      if (isMatch) {
        // Generate a JWT token
        const token = jwt.sign(
          {
            id: oldUser._id,
            email: oldUser.email,
            fullName: oldUser.fullName,
            role: oldUser.role,
            mobile: oldUser.mobile,
            location: oldUser.location,
            bio: oldUser.bio,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "50m" }
        );
        res.cookie("auth-token", token);
        return res.status(200).json({redirectUrl:"/app/dashboard" });
      } else {
        // Respond with an error if passwords do not match
        return res.status(400).json({ error: "Password does not match" });
      }
    });
  } catch (err) {
    return next(err);
  }
});
const Logout = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) return res.sendStatus(204);
    const cookie = authHeader.split("=")[1];
    const accessToken = cookie.split(";")[0];
    const checkifBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkifBlacklisted) return res.sendStatus(204);
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    res.setHeader("Clear-Site-Data", '"cookies"');
    res.status(200).redirect("/app/login");
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
};
const forogotPassword = async (req, res, next) => {
  console.log(req.body.emailaddress)
  const user = await users.findOne({ email: req.body.emailaddress });
  
  console.log(user)

  if (!user) {
    return res.status(404).json({ error: "User does not exist" });

  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  user.passwordResetCode = hashedResetCode;
  user.passwordResetExpire = Date.now() + 3 * 60 * 1000;
  user.passwordResetVerified = false;
  await user.save();
  const message = `Hi ${user.fullName},\n  We received a request to reset the password on your Pc Limited Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Pc Limited Team`;
  try {
    console.log("test2222");
    await sendEmail({
      email: user.email,
      subject: "Your password reset code (valide for 10 min)",
      message,
    });
    console.log("sucees message");
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpire = undefined;
    user.passwordResetVerified = undefined;
    await user.save();
    return "erro in sending email , 500";
  }
  req.session.emailaddress = req.body.emailaddress;

  return res.json({redirectUrl:"/app/confirm"});
};
const verifyPassResetCode = async (req, res, next) => {
  console.log("test0", req.session.emailaddress);
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await users.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.json({error:'Reset code invalid or expired'})
  }
  user.passwordResetVerified = true;
  await user.save();
  //res.setHeader('Clear-Site-Data', '"cookies"');
  //req.session.emailaddress = req.body.emailaddress;

  res.status(200).json({redirectUrl: "/app/resetpass"});
};
const resetPassword = async (req, res, next) => {
  const user = await users.findOne({ email: req.session.emailaddress });
  
  console.log(user);
  if (!user) {
    return res.status(500).json({error: "no user with this email"});
  }
  if (!user.passwordResetVerified) {
    return res.status(500).json({error: "confirm first your code send in your mail"});
  }
  
  bcript.genSalt(saltRounds, async function (err, salt) {
    bcript.hash(req.body.newPassword, salt, async (err, hash) => {
      user.password = hash;
      user.passwordResetCode = undefined;
      user.passwordResetExpire = undefined;
      user.passwordResetVerified = undefined;
      await user.save();
      res.setHeader("Clear-Site-Data", "cookies");
      const token = jwt.sign(
        { email: user.email, fullName: user.fullName },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "20m" }
      );
      res.cookie("auth-token", token);
      return res.status(200).json({redirectUrl: "/app/dashboard"});
    });
  });
};
const delUser = async (req, res) => {
  try {
    const id = req.params.id;
    await users.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: "okkk not " });
  }
};

const upduserAvatar = async (req, res) => {
  console.log("test")
  upload.single("file")(req, res, async (err) => {
    const id2 = req.body.id;
    const user = await users.findById(id2);
    console.log("test2")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    // If no file is uploaded, keep the old avatar
    console.log(req.file)
    if (req.file) {
      const isImage = req.file.mimetype.startsWith("image/");
      const url = `uploads/${isImage ? "imgs" : "videos"}/profiles/${req.file.filename}`;
      console.log(user.avatar)
      user.avatar = url;
      await user.save();
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          mobile: user.mobile,
          location: user.location,
          bio: user.bio,
          isActive: user.isActive,
          avatar : user.avatar

        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "50m" }
      );
  
      res.cookie("auth-token", token);
      res.redirect("/app/profile");
    }
    


  });

};
const updUser = async (req, res, next) => {
  console.log(req)
  try {
    // Wrap upload.single in a promise for better async handling
    const id2 = req.body.id;
    const user = await users.findById(id2);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    /*
    user.email = req.body.email;
    user.fullName = req.body.fullName;
    user.mobile = req.body.mobile;
    user.location = req.body.location;
    user.bio = req.body.bio;
    user.role = req.body.role;
    user.isActive = req.body.isActive === "on";*/
    user.email = req.body.email;
      user.fullName = req.body.fullName;
      user.mobile = req.body.mobile;
      user.location = req.body.location;
      user.bio = req.body.bio;
      user.role = req.body.role;
      if (req.body.isActive === "on") {
        user.isActive = true;
      } else {
        user.isActive = false;
      }

    await user.save();
    const referer = req.headers.referer;
    
    if (referer.includes('/app/profile')) {
      return res.redirect('/app/profile');
    } else if (referer.includes('/app/users')) {
      return res.redirect('/app/users');
    } else {
      return res.redirect('/app/dashboard');
    }

    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//dashboared = ===========================================================================
const addEvent = async (req, res) => {
  const { title, category } = req.body;
  console.log(req.body);
  try {
    const newEvent = new events({
      title,
      start: new Date(now() + 158e6),
      end: new Date(now() + 159e6),
      className: category,
    });
    await newEvent.save();
    res.status(200).json({ message: "suceess add event" });
  } catch (err) {
    res.status(404).json({ massage: "try again !!" });
  }
};
const getEvent = async (req, res) => {
  const eventss = await events.find({}, { __v: false }, { _id: false });
  console.log(eventss);
  res.status(200).json({ data: eventss });
};

//dashboared = ===========================================================================

// commpany settings
const { Company } = require("../models/company.md");
const roles = require("../utils/userRoles");
const { default: next } = require("next");

const updCompany = async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      name,
      phoneNumber,
      description,
      googleAnalyticsId,
      systemEmail,
      metaApiTrack,
      author,
      companyName,
      companyLocation,
      socialFacebook,
      socialx,
      socialInstagram,
      socialLinkedin,
      socialSkype,
      socialGithub,
    } = req.body;
    console.log("test company :", req.body);

    // Create a new company document
    const mycompanys = await Company.find({});
    const mycompany = mycompanys[0];
    console.log("from db  :", mycompany);

    mycompany.name = name;
    mycompany.phoneNumber = phoneNumber;
    mycompany.description = description;
    mycompany.googleAnalyticsId = googleAnalyticsId;
    mycompany.systemEmail = systemEmail;
    mycompany.metaApiTrack = metaApiTrack;
    mycompany.author = author;
    mycompany.companyName = companyName;
    mycompany.companyLocation = companyLocation;
    mycompany.social.facebook = socialFacebook;
    mycompany.social.x = socialx;
    mycompany.social.instagram = socialInstagram;
    mycompany.social.linkedin = socialLinkedin;
    mycompany.social.skype = socialSkype;
    mycompany.social.github = socialGithub;

    await mycompany.save();

    // Redirect or respond as needed
    res.redirect("/app/settings"); // Adjust the redirect or response as needed
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// commpany users
const getUsers = async (req, res) => {
  console.log(req.query);
  /*
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 8;
    const skip = (page - 1) * itemsPerPage;
    */

  try {
    //const totalItems = await users.countDocuments();
    const users2 = await users.find();
    res.render("manage-users", {
      roles,
      user: req.user,
      isManageUsers: true,
      users: users2,
      /*currentPage: page;*/
      /*totalPages: Math.ceil(totalItems / itemsPerPage);*/
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
///apchat
const getUsers2 = async (req, res) => {
  try {
    const users2 = await users.find();
    res.json({ users2 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// commpany users

// commpany export
const exportss = async (req, res) => {
  try {
    // Fetch all users
    const Allusers = await users.find().lean();

    // Convert data to CSV or JSON (Here we'll use JSON for simplicity)
    const jsonUsers = JSON.stringify(Allusers, null, 2);

    // Set the response header to prompt download
    res.setHeader("Content-disposition", "attachment; filename=users.json");
    res.setHeader("Content-type", "application/json");

    // Send the data
    res.send(jsonUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error exporting data");
  }
};

//messages -- chat

const getMessage = async (req, res) => {
  console.log("receiver :", req.user.id);
  console.log("sender :", req.params.userId); ///sender of messg in chat

  //const message = await Message.findById(req.params.userId)
  if (!req.user) return res.status(401).send("Unauthorized");

  const messages = await Message.find({
    $or: [
      { sender: req.params.userId, receiver: req.user.id }, // Condition 1: sender is user1Id
      { sender: req.user.id, receiver: req.params.userId }, // Condition 2: receiver is user2Id
    ],
  })
    .populate("sender receiver")
    .sort({ timestamp: 1 });
  console.log("get success :", messages);
  if (messages == []) {
    res.json({ messages: false, Me: req.user.id, receiver: req.params.userId });
  } else {
    res.json({ messages, Me: req.user.id, receiver: req.params.userId });
  }
};

const sendMessage = async (req, res) => {
  console.log("test send ", req.user);
  if (!req.user) return res.status(401).send("Unauthorized");
  const { message, receiverId } = req.body;
  console.log("body send ", req.body);
  const newMessage = new Message({
    sender: req.user.id,
    receiver: receiverId,
    message,
  });

  await newMessage.save();
  res.json({ success: true });
};

const getMusers = async (req, res) => {
  console.log("test,req.user :", req.user);
  if (!req.user) return res.status(401).send("Unauthorized");

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Fetch latest messages received by the user
    const receivedMessages = await Message.aggregate([
      { $match: { receiver: userId } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$sender",
          latestMessage: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$latestMessage" } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      {
        $unwind: "$senderDetails",
      },
    ]);

    // Fetch latest messages sent by the user
    const sentMessages = await Message.aggregate([
      { $match: { sender: userId } },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$receiver",
          latestMessage: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$latestMessage" } },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      {
        $unwind: "$receiverDetails",
      },
    ]);
    // Combine both received and sent messages
    const allMessages = [...receivedMessages, ...sentMessages];
    console.log("allMessages :", allMessages);

    // Sort all messages by timestamp descending
    allMessages.sort((a, b) => b.timestamp - a.timestamp);
    console.log("allMessages soreted :", allMessages);

    // Create a map to store the latest message for each unique conversation
    const uniqueConversations = new Map();

    allMessages.forEach((message) => {
      const userKey =
        message.sender.toString() === req.user.id
          ? message.receiver.toString()
          : message.sender.toString();

      if (!uniqueConversations.has(userKey)) {
        uniqueConversations.set(userKey, message);
      }
    });

    // Convert map to an array of latest messages
    const userss = Array.from(uniqueConversations.values());

    res.json({ userss, Me: req.user.id });
  } catch (error) {
    console.error("Error fetching latest conversations:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getMsent = async (req, res) => {
  console.log("test,req.user :", req.user);
  if (!req.user) return res.status(401).send("Unauthorized");

  const userss = await Message.aggregate([
    {
      $match: { sender: new mongoose.Types.ObjectId(req.user.id) },
    },
    {
      $sort: { timestamp: -1 }, // Sort messages by timestamp in descending order
    },
    {
      $group: {
        _id: "$receiver", // Group by sender's ID
        latestMessage: { $first: "$$ROOT" }, // Keep the first document in each group (latest message)
      },
    },
    {
      $replaceRoot: { newRoot: "$latestMessage" }, // Replace the root document with the latest message document
    },
    {
      $lookup: {
        from: "users", // The name of the users collection in MongoDB
        localField: "receiver", // The field from the current collection
        foreignField: "_id", // The field from the 'users' collection
        as: "receiver", // Alias for the joined documents
      },
    },
    {
      $unwind: "$receiver", // Unwind the sender array to include sender details directly
    },
  ]);

  console.log("my users : ", userss);
  res.json({ userss });
};
//messages -- chat

module.exports = {
  upduserAvatar,
  getMsent,
  getUsers2,
  getMusers,
  sendMessage,
  getMessage,
  exportss,
  delUser,
  getUsers,
  updCompany,
  updUser,
  getEvent,
  addEvent,
  resetPassword,
  verifyPassResetCode,
  forogotPassword,
  login,
  Logout,
  register,
};
