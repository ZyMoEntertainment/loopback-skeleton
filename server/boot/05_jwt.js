'use strict';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || 'test';
const Utils = require('../services/util-service');

module.exports = function(app) {
  const User = app.models.MyUser;
  const AccessToken = app.models.AccessToken;

  User.prototype.createAccessToken = function(ttl, cb) {
    const userSettings = this.constructor.settings;
    const expiresIn = Math.min(ttl || userSettings.ttl, userSettings.maxTTL);
    const token = jwt.sign({id: this.id, email: this.email}, secretKey, {expiresIn});
    return cb ? cb(null, Object.assign(this, {token})) : {id: token};
  };

  User.logout = function(tokenId, fn) {
    // You may want to implement JWT black list here
    fn();
  };

  AccessToken.resolve = function(id, cb) {
    if (id) {
      try {
        const data = jwt.verify(id, secretKey);
        cb(null, {userId: data.id});
      } catch (err) {
        // Should override the error to 401
        cb(Utils.notAuthorizedError());
      }
    } else {
      cb();
    }
  };
};
