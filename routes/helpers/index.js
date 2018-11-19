const hbs = require('hbs');//导入hbs库，扩展handlebars
const path = require('path');
const helpers = require('handlebars-helpers');//helpers库
const moment = require('moment');

//注册partial目录
hbs.registerPartials(path.join(__dirname, '../../views/common'));


//只导入一部分helpers,并且与我们的handlebars实例挂钩
helpers.comparison({handlebars: hbs.handlebars});

//注册帮助方法
hbs.registerHelper('addOne', function (num) {
    return ++num;
});
hbs.registerHelper('minusOne', function (num) {
    return --num;
});
hbs.registerHelper('date', function (date, format) {
    const m = moment(date);
    if (m) {
        return m.format(format);
    } else {
        return ''
    }
});

//注册代码块扩展
const blocks = {};//代码块缓存对象
hbs.registerHelper('extend', function (name, context) {
    //context 是选项，保存有用方法和数据，永远最后一个
    let block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    //编译指令中代码块，并放入block
    block.push(context.fn(this));
    //与context.fn()配对的方法：
    //context.inverse() //编译的是else显示的代码
});

hbs.registerHelper('block', function (name) {
    const val = (blocks[name] || []).join('\n'); //重新编译回原本代码
    blocks[name] = [];//清空缓存
    return val;
});

//传参方式2:hash  超链接
hbs.registerHelper('link', function (options) {
    const {text, href, style} = options.hash;
    return new hbs.SafeString(`<a href="${href}" style="${style}">${text}</a>`);
    //${hbs.Utils.escapeExpression(text)}  -->手动转码，成为字符串
});

//动态partial
hbs.registerHelper('whichPartial', function (name) {
    return name;
});

//获取时间的一部分
hbs.registerHelper('partOfDate', function (str, part, index) {
    const date = new Date(str);
    if (part == 'd') {
        let d = date.getDate();
        d = d < 10 ? '0' + d : d.toString();
        return d;
    } else if (part == 'M') {
        return '' + (date.getMonth() + 1);
    } else if (part == 'h') {
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h.toString();
        return h[index];
    } else if (part == 'm') {
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m.toString();
        return m[index];
    } else {
        return ''
    }
});
