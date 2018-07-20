# Test Utilty files

## _setup.js

This file is there to ensure that boot scripts run before we run our tests. It could do other setup tasks as necessary, but loopback itself handles most of what we need already.

## random-factory.js

Random factory serves mock data. It makes use of the [faker](https://github.com/Marak/Faker.js#readme) library. As you add models, make sure to add them to the factory so you can test them. 

## test-utils.js

This is a generic library for useful testing functions. It comes with a login function, but anywhere you find yourself needing to do the same thing in more than one place consider refactoring out to this file.

# Testing Libraries

We use a few libraries to make testing easier:

[should](https://github.com/shouldjs/should.js) - assertion library
[mocha](https://mochajs.org/) - test runner
[supertest](https://github.com/visionmedia/supertest) - http agent for testing controllers and other things that make http requests
[faker](https://github.com/Marak/Faker.js#readme) - tool for generating mock data