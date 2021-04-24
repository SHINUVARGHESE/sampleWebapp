var express = require('express');
var router = express.Router();

/* GET users listing. */


router.get('/', function(req, res, next) { 
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.userloggedIn){
    let user = req.session.user
    res.render('user',{user:user})
  }else{
    res.render("login");
  }
});

module.exports = router;
