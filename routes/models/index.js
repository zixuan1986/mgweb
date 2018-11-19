const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('kaikeba', 'root', 'J@Caad15Qy', {
    host: '114.115.243.91',
    dialect: 'mysql',
    pool: {max: 5, acquire: 30000, idle: 10000},
    timestamps: false,
});

const db = {Sequelize, sequelize};

fs.readdirSync(__dirname)
    .filter(file => (file !== 'index.js' && file !== 'db.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });
module.exports = db;






