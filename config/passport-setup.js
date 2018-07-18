const passport = require('passport');
const GitHubStrategy = require('passport-github');

const User = require('../models/usermodel')

passport.serializeUser((user, cb)=>{
  cb(null, user.id);
})
passport.deserializeUser((id, cb)=>{
  User.findById(id).then((user)=>{
      cb(null,user)
  })
})

passport.use(new GitHubStrategy({
    clientID: 'f3bbc4a2c3a4c07a6506',
    clientSecret: '21388463e853e6aa53c318ef19eb86009a0f2c6c',
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    console.log("here is the details....");
    console.log(profile.id);
    console.log(profile._json.name);
    console.log(profile.emails);
    console.log(profile._json.avatar_url);
    User.findOne({githubId:profile.id}).then((currentUser)=>{
      if(currentUser){
          console.log("user already exist")
          console.log(currentUser)
          cb(null,currentUser);
      }else{
          console.log("New user")
          new User({
              username: profile._json.name,
              githubId: profile.id,
              profileImg: profile._json.avatar_url

          }).save().then(function(newUser){
              console.log('user created: ', newUser)
              cb(null,newUser);
          })
      }
  })
  }
));
