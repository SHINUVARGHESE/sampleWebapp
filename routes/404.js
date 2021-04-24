var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/404', function(req, res, next) {
  res.render('404', { title: 'Error Page' });
});

module.exports = router;
