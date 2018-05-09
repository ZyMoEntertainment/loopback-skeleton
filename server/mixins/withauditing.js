'use strict';

var loopback = require('loopback');
var LoopBackContext = require('loopback-context');

module.exports = function(Model, options) {
  //Model is the model class
  //options contains the config properties from model definition
  Model.defineProperty('createddate', {type: Date});
  Model.defineProperty('modifieddate', {type: Date});
  Model.defineProperty('modifiedby', {type: 'number'});
  Model.defineProperty('createdby', {type: 'number'});

  Model.observe('before save', function event(ctx, next) {
    var curContext = LoopBackContext.getCurrentContext();
    var currentUser = curContext && curContext.get('accessToken');
    var currUserId = currentUser ? currentUser.userId : null;

    if (ctx.instance) {
      ctx.instance.modifieddate = new Date();
      ctx.instance.modifiedby = currUserId;
    } else {
      ctx.data.modifieddate = new Date();
      ctx.data.modifiedby = currUserId;
    }
    
    if (ctx.isNewInstance) {
      ctx.instance.createddate = new Date();
      ctx.instance.createdby = currUserId;
    }
    next();
  });
};