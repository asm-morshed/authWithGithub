const express = require('express');
const app = express();
var mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');


const authRouter = require('./routes/auth-route');
const authProfile = require('./routes/auth-profile')

const passportSetUp = require('./config/passport-setup')
const mongokeys = require('./config/keys');


const PORT = process.env.PORT || 8080;

app.set('view engine','ejs')

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ['asmmorshed']
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(mongokeys.dbrul,function(){
	console.log("Connected with online db")
})
app.use('/auth',authRouter)
app.use('/profile',authProfile)

app.get('/',(req,res)=>{
	res.render('index');
})
app.listen(PORT, ()=>{
	console.log('Server is running on port: ', PORT);
})
