'use strict';

var express = require('express'),
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  path = require('path'),
  config = require('./environment'),
  errorHandler = require('errorhandler');

module.exports = function (app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.set('appPath', path.join(config.root, 'client'));

  // just let node modules be public for now
  app.use('/node_modules', express.static(path.resolve(app.get('appPath') + '/../node_modules/')));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
