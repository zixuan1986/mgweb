//连接数据库
const mysql = require('mysql');
const cfg = {
    host: '114.115.243.91',
    user: 'root',
    password: 'J@Caad15Qy',
    database: 'web'
};

const pool = mysql.createPool(cfg);

module.exports = {
    query: function (sql, value) {
        return new Promise((resolve, reject) => {
                pool.query(sql, value, (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
        });

    }
};

