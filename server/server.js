'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.use(loopback.token({
  model: app.models.accessToken,
  currentUserLiteral: 'me',
  bearerTokenBase64Encoded: false // here
}));

var morgan = require('morgan');
var cors = require('cors');
var device = require('express-device');

const http = require('http');
const https = require('https');
const sslConfig = require('./ssl-config');

morgan.token('body', function(req) {
  var body = req.body;
  //remove sensitive info from requests before logging them
  if (body) {
    if (body.password) {
      body.password = '****';
    }
    var jsonbody = JSON.stringify(body);
		//we don't want massive request bodies logged
    if (jsonbody.length > 1000) {
      jsonbody = 'request body too large to log';
    }
    return jsonbody;
  } else {
    return '';
  }
});

app.use(morgan('[:date[clf]] :method :url :body :status :response-time ms'));
app.use(cors());
app.use(device.capture({parseUserAgent: true}));

app.start = function() {
  // start the web server
  let server = null;
  if (sslConfig.privateKey && sslConfig.certificate) {
    var options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
    };
    server = https.createServer(options, app);
  } else {
    console.log('Starting up in HTTP mode.');
    server = http.createServer(app);
  }

  server.listen(app.get('port'), () => {
    var baseUrl = ((sslConfig.privateKey && sslConfig.certificate) ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
    app.emit('started');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});