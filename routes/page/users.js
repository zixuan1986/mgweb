var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('page/users', {
        title: '用户管理-MGTV-WEB组件库管理系统',
        useradd: true
    });
});

module.exports = router;
