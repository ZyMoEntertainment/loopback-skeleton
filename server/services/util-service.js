'use strict';

const _ = require('lodash');
const relationMethods = ['findById', 'destroyById', 'updateById', 'exists', 'link', 'get',
                        'create', 'update', 'destroy', 'unlink', 'count', 'delete', 'upsert', 'replace'];

/*
List of Util functions used throughout the app
*/
module.exports = {
  whitelistModel: function(Model) {

    if (Model.settings.whitelist) {
      Model.sharedClass.methods().forEach(method => {

        if (Model.settings.whitelist.indexOf(method.name) < 0) {
          Model.disableRemoteMethodByName(method.name, method.isStatic);
        }
      });
    }

    if (Model.settings.relations) {
      let relations = _.keys(Model.settings.relations);
      let method = null;
      relations.forEach(relation => {
        let whitelist = Model.settings.relations[relation].whitelist;
        if (whitelist) {

          relationMethods.forEach(methodPrefix => {
            method = `__${methodPrefix}__${relation}`;
            if (whitelist.indexOf(methodPrefix) < 0) {
              Model.disableRemoteMethodByName(method, false);
            }
          });
        }
      });
    }
  },
  
  blacklistModel: function(Model) {

    if (Model.settings.blacklist) {
      Model.sharedClass.methods().forEach(method => {

        if (Model.settings.blacklist.indexOf(method.name) >= 0 || Model.settings.blacklist === '*' || Model.settings.blacklist[0] ==='*') {
          Model.disableRemoteMethodByName(method.name, method.isStatic);
        }
      });
    }

    if (Model.settings.relations) {
      let relations = _.keys(Model.settings.relations);
      let method = null;
      relations.forEach(relation => {
        let blacklist = Model.settings.relations[relation].blacklist;
        if (blacklist) {

          relationMethods.forEach(methodPrefix => {
            method = `prototype.__${methodPrefix}__${relation}`;
            if (blacklist.indexOf(methodPrefix) >= 0 || blacklist === '*' || blacklist[0] ==='*') {
              Model.disableRemoteMethodByName(method, false);
            }
          });
        }
      });
    }
  },
  
  notFoundError: function(relation = 'object') {
    let e = new Error();
    e.statusCode = 404;
    e.message = `Could not find ${relation}`;
    return e;
  },

  badRequestError: function(message = 'Invalid Request') {
    let e = new Error();
    e.statusCode = 400;
    e.message = message;
    return e;
  },

  notAuthorizedError: function() {
    let e = new Error();
    e.statusCode = 401;
    e.message = 'You are not authorized to perform this action';
    return e;
  }
};