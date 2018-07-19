'use strict';

module.exports = function(ExampleModel) {
  //model files are where all of your custom routes
  //are found. Think of these files as the Controller in
  //a typical MVC app, and the accompanying .json
  //file as the Model (the 'view' would be the returned json).
  //this file has an example remote method that accepts a name
  //as a paramater and returns a boolean indicating if it exists
  //or not
  
  ExampleModel.existsByName = function(name, cb) {
    ExampleModel.count({name: name})
    .then(num => {
      return cb(null, num > 0);
    })
    .catch( err => {
      return cb(err);
    });
  };

  //ex api/Events/exists/John
  ExampleModel.remoteMethod('existsByName', {
    accepts: {arg: 'name', type: 'string', required: true},
    returns: {arg: 'data', root: true},
    http: {path: '/exists/:name', verb: 'get'},
  });

};
