'use strict';

module.exports = function(app, cb) {
  if (process.env.NODE_ENV === 'test') {
    console.log('Wiping Tables');
    var storage = app.datasources.db;
    if (storage.connected) {
      storage.automigrate(function(err) {
        console.log('Done migrating tables');
        cb();
      });
    } else {
      storage.once('connected', function() {
        storage.automigrate(function(err) {
          console.log('Done migrating tables');
          cb();
        });
      });
    }
  } else {
    var ds = app.datasources['db'];

    ds.autoupdate((err) => {
      if (err) {
        console.log('Error migrating databases: ' + err);
      }
      cb();
    });
  }
};