const app = require('../server/server');

module.exports = {
  //if you've changed either of these values in
  //server/boot/04_admin-users.js, you'll have
  //to change them here as well
  credentials: {
    admin: {
      email: 'example@email.com',
      password: 'CHANGEME'
    }
  },

  loginAsAdmin: function(cb) {
    let credentials = this.credentials.admin;
    app.models.MyUser.login(credentials, cb);
  }
}