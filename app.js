var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var components = require('./routes/components');

var isDev = process.env.NODE_ENV !== 'production';
var app = express();
app.locals = {};
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
  // webpack
  var webpack = require("webpack");
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackDevConfig = require('./webpack.dev.js');
  var compiler = webpack(webpackDevConfig);

  // 使用webpack 中间件
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    // noInfo: true,
    stats: {
      colors: true
    }
  }));
  // 使用webpack 热更新中间件
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', routes);
app.use('/components', components);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
