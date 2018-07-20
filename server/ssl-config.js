

'use strict';

const path = require('path');
const fs = require('fs');

let keyPath = path.join(__dirname, './private/key.pem');
let certPath = path.join(__dirname, './private/certificate.pem');
if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  module.exports = {
    privateKey: fs.readFileSync(keyPath, 'utf8').toString(),
    certificate: fs.readFileSync(certPath, 'utf8').toString(),
  };
} else {
  module.exports = {};
}
