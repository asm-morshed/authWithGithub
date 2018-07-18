const router = require('express').Router();
const passport = require('passport');

router.get('/login',(req,res)=>{
    console.log("from auth route")
    res.render('login');
});
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})
router.get('/github',passport.authenticate('github'),function(req,res){
    console.log("Clicked")
});
router.get('/github/callback',  passport.authenticate('github'),  function(req, res) {
    // Successful authentication, redirect home.
    console.log("After callback")
   res.redirect('/profile');
  });

module.exports = router;