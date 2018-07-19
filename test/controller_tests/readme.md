# Controller tests

Your applications controllers should be tested to ensure that ACLs are being properly applied, and to ensure that any custom routes are correctly configured. These don't need to test the actual functionality of the route, those can be handled in model tests. This is simply verifying that the routes exist where you think and that they return the expected status.

These tests will rely heavily on the [supertest](https://github.com/visionmedia/supertest) library

test_example_acls.js is a decent guide to follow for writing acl tests.