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
    };
  },

  randError: function() {
    return {
      url: faker.internet.url(),
      stack: faker.lorem.paragraph(),
      error: faker.lorem.sentence(),
      deviceInfo: '{}'
    };
  }
};