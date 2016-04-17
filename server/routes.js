'use strict';

var path = require("path"),
  errors = require("./components/errors");

module.exports = function (app) {
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};
