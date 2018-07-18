const router = require('express').Router();

function authCheck(req,res,next){
    console.log("from auth profile authCheck method"+ req.user)
    console.log('end checked method...')
    if(!req.user){
        res.redirect('/auth/login');
        console.log("---Not okay---")
    }else{
        console.log("-----okay----")

        next();
    }
}

router.get('/',authCheck,(req,res)=>{
    console.log("from auth profile render profile")
    
    //res.send('your profile page')
    res.render('profile',{user: req.user});
})

module.exports = router;