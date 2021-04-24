var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers')

/* GET home page. */
router.get('/', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
    res.redirect('/admin/adminPage') 
  }else{
    res.render("adminLogin", { title: "Admin Page" , value: req.session.error});
    req.session.error=false
  }

});


router.post('/adminSubmit', function(req, res) {
  
      let adminMail = 'admin@123.com'
      let adminPass = '12345'
      if(req.body.mail== adminMail && req.body.pass == adminPass){
  
         req.session.adminloggedIn = true;
         res.redirect('/admin/adminPage')   

      }else{
       req.session.error=true
       res.redirect('/admin')
      }

});

router.get('/adminPage', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

  if(req.session.adminloggedIn){
   
    res.render('admin', { title: 'Admin Page' });

  }else{
    req.session.error=true
    res.redirect('/admin')
  }
});


router.get('/editUser', function(req, res) {
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  res.redirect('edit')
  }else{
    res.redirect('/admin')
  }
});

router.get('/edit', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
    userHelpers.readData(req.body,(response)=>{
    res.render('editUser',{response})
    })
  }else{
    res.redirect('/admin')
  } 
});

router.get('/viewUser', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  res.redirect('view');
  }else{
  res.render('adminLogin')
  }
});

router.get('/view', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  userHelpers.readData(req.body,(response)=>{
  res.render('viewUser',{response})
  })
  }else{
    res.redirect('/admin')
  }
});

router.get('/refresh', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  userHelpers.readData(req.body,(response)=>{
  res.render('editUser',{response})
  })
  }else{
    res.redirect('/admin')
  }
});

router.post('/submitNew',function(req, res) {
  userHelpers.dosignUp(req.body,(response)=>{
    res.redirect('/admin/view')
    })
 
});

router.get('/delete/',(req, res)=>{
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  userHelpers.doDelete(req.query,(response)=>{
    res.redirect('/admin/edit')
   
  })}else{
    res.redirect('/admin')
  }
 
 
});

router.get('/editData/',(req, res)=>{
 
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate'); 
  if(req.session.adminloggedIn){
  res.render('editUserData',{data:req.query})
  }else{
    res.redirect('/admin')
  }
});

router.post('/updateUser/', (req, res)=>{
  userHelpers.doUpdate(req.query,req.body,(response)=>{
    if(response){
    res.redirect('/admin/view')
    }else{
      res.redirect('/admin/edit')
    }
  })
});

router.post('/search', (req, res)=>{
  userHelpers.doSearch(req.body,(response)=>{
  res.render('editUser',{response})
  })
});

router.get('/adminLogout', function(req, res) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  if(req.session.adminloggedIn){
  req.session.adminloggedIn=false;
  res.redirect('/admin');
  }else{
    res.redirect('/admin')
  }
});

router.get('/newUser', function(req, res) {
  if(req.session.adminloggedIn){
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.render('newUser')
  }else{
    res.redirect('/admin')
  }
});

module.exports = router;
