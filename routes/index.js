var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('page/index', { title: 'MGTV-WEB组件库管理系统' });
});

module.exports = router;
