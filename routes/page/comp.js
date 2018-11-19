var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('page/comp', {
        title: '组件管理-MGTV-WEB组件库管理系统',
        compadd: true
    });
});

module.exports = router;
