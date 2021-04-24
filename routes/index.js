var express = require('express');
const session = require('express-session');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get("/", function (req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.render("index", { title: "Home Page" , value: req.session.error});
  req.session.error=false
});


router.get('/signUp', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.userloggedIn){
    res.redirect('/user')
  }else{
    res.render('signUp');
  }
  
});

router.get('/login', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.userloggedIn){
    res.redirect('/user')
  }else{
    res.render('login');
  }
});

router.post('/login', function(req, res) {
     userHelpers.doLogin(req.body,(result)=>{
     if(result){ 
      req.session.user=result
      req.session.userloggedIn = true;
       res.redirect('/user')
     }else{
      req.session.error=true
       res.render('login')
     }

    
})
});

router.get('/logout', function(req, res) {
  if(req.session.userloggedIn){
  req.session.userloggedIn=false;
  res.redirect('/');
  }else{

  }
});

router.post('/submit', function(req, res) {
  userHelpers.dosignUp(req.body,(response)=>{
    res.redirect('/login')
      
  })
});



module.exports = router;
