const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local');
const path = require('path');
const db =require('./config/mongoose')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware= require('./config/middleware');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const expresslaylots= require('express-ejs-layouts');


app.use(express.static('./assets'));
app.use(expresslaylots);

// extract style from the sub pages

app.set("layout extractStyles", true)
app.set('layout extractScripts', true);


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: "Student Management System",
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 1000, // Corrected maxAge value
    },
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URL,
        autoRemove:'disabled',
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash())
app.use(customMware.setflash);

// Set view engine and views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes'));

// Server listening
app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server:", err);
    } else {
        console.log("Server is running on port:", port);
    }
});
