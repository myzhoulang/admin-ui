var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('*', function(req, res, next){
  var sPath = (req.path || '').substr(1);
  res.render("components/" + sPath, {title: sPath});
})

module.exports = router;
