const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Emply = require('../models/emply')

// Authentication using passport 
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async function (req, email, password, done) {

    try {
      const emply = await Emply.findOne({ email: email });
      if (emply) 
      {
        if (password != emply.password) 
        {

          req.flash('error', "invalid username/password")

          // console.log("nnnnnn",req.flash('success'));

          return done(null, false);
        }
        else {
          // console.log("Locals-> "+emply);
          return done(null, emply);
        }
      }
      else {

        req.flash('error', "employee is not authenticated")
        return done(null, false)
      }
    }

    catch (error) {
      console.log(error);
      req.flash('error', "error in finding the user")
      return done(error);
    }

  }
));

// serializing the emmply to be kept cookies 
passport.serializeUser(function (emply, done) {
  // console.log( emply.id)
  // console.log("serialize-> "+emply);
  done(null, emply.id);
})

//deserializing the emmply from the key the cookie 
passport.deserializeUser(async function (id, done) {

  const emply = await Emply.findById(id);
  // console.log("Deserialize-> "+emply);
  if (emply) {
    return done(null, emply);
  }
  else {
    console.log("User not found");
    return done(Error);
  }
});



// check authentication 

passport.checkAuthentication = function (req, res, next) {
  // if the emply is signin then pass the req to next function 

  if (req.isAuthenticated()) {
    return next();
  } else {


    return res.redirect('/employees/signin');
  }
}

// set the authenication 
passport.setAuthenticatedUser = async function (req, res, next) {
  // req.emply contains current signin user and sending to the locals
  if (req.isAuthenticated()) {
    // console.log(req.isAuthenticated()+"   "+req.user);
    res.locals.emply = req.user;
  }


  next();
}

module.exports = passport;


