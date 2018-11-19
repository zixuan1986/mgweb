const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helper = require('./routes/helpers');//注册hbs帮助方法
const $ = require('jquery');

const {initLocals} = require('./routes/middleware');//全局

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/page/users');
const compRouter = require('./routes/page/comp');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(initLocals);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comp', compRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('page/error');
});

module.exports = app;
