require('dotenv').config();
const express = require('express');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const connectionDb = require('./config/db');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

// Import CSV parser
const csvParser = require('csv-parser');

// Connect to the database
connectionDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(cors());

// View engine setup
app.set('view engine', 'ejs');

// Middleware to set layout dynamically
app.use((req, res, next) => {
  if (req.url.startsWith('/app')) {
    app.set('layout', './layouts/main');
  } else {
    app.set('layout', './frontend/layouts/main');
  }
  next();
});

// Use express-ejs-layouts after setting the layout
app.use(expressLayout);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 10 * 60 * 1000 // 10 minutes
    }
}));

// Disable caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Routes
app.use('/', require('./routes/frontend.route'));
app.use('/app', require('./routes/app.route'));
app.use('/app', require('./routes/user.route'));

// 404 Page Not Found
app.get('*', (req, res) => {
    res.status(404).render('404', { layout: false });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
