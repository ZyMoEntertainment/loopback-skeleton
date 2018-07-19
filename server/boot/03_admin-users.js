'use strict';

module.exports = function(app, cb) {

  let person = app.models.User;

  let email = 'example@email.com';

  if (person === undefined || person === null) {
    console.log('Error finding person model');
  } else {
    console.log('Finding or Creating the Person user');
    person.findOrCreate({
        where: { email: email }
      },{
        email: email,
        password: 'CHANGEME',
        emailVerified: true,
        username: 'Admin'
      },
      function(error, userInstance, userCreated) {
        if (userCreated) {
          console.log('Created admin user');
        }

        if(error) {
          console.log(error)
        }
        cb();
      });
  }
};
