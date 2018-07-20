'use strict';

const app = require('../server/server');

module.exports = {

  remoting: {
    errorHandler: {
      handler: function(err, req, res, next) {
        //we only care about certain errors, ignore errors that are handled somewhat gracefully
        //like 404s
        if (err && err.statusCode != 400 &&
          err.statusCode != 401 && err.statusCode != 403 &&
          err.statusCode != 404 && err.statusCode != 422) {
          if (req && req.device && req.device.parser) {
            delete req.device.parser.options;
          }
          app.models.Error.create({
            error: err.message,
            stack: err.stack,
            url: req.url,
            deviceInfo: JSON.stringify(req.device),
          }, function(error, errorInstance) {
            if (error) {
              return next(error);
            } else {
              //this would be a good spot to
              //do something else with the error,
              //such as send an email to the development
              //group
              return next(err);
            }
          });
        } else {
          //handle the error the usual way
          return next(err);
        }
      },
    },
  },
};
