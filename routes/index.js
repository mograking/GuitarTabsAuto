var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GTAv1', songid:null });
});

router.get('/GTAText', function(req, res, next) {
  res.render('GTAv2', { title: 'GTAv2', songid:null });
});
module.exports = router;
