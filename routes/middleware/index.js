const {query} = require('../models/db');
let channelCache = null;
let zfootCache = null;

module.exports.initLocals = async function (req, res, next) {
    const isLogin = true;
    res.locals.navName = isLogin ? 'nav' : 'no_login';

    const channelsql = 'SELECT * FROM kaikeba.channel';
    const zfootsql ='SELECT * FROM kaikeba.zfoot';

    if (channelCache || zfootCache) {
        res.locals.channel = channelCache;
        res.locals.zfoot = zfootCache;
        next();
    } else {
        try{
            const channel = await query(channelsql);
            const zfoot = await query(zfootsql);
            channelCache = res.locals.channel = channel;
            zfootCache = res.locals.zfoot = zfoot;
            next();//进入后续中间件
        }catch (err) {
            next(err);
        }
    }

};


