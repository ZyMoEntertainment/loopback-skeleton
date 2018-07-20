const faker = require('faker');

module.exports = {
  randUser: function(password = 'pass') {
    return {
      email: faker.internet.email(),
      password: password,
    };
  },

  randExampleModel: function() {
    return {
      name: faker.name.findName()
    }
  }
};