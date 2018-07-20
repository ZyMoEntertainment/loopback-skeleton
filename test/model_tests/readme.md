# Model Tests

Model tests test functionality of your model. For example, if you have a Person model that has a Pets relationship, you would want to write a test to make sure that relationship works as expected. The most basic example of a model test is contained in test_example_model.js. When we create a model, to ensure that it is set up properly we want to create one and verify we can fetch it. This might seem simple but as complexities are introduced this type of test becomes more and more valuable.

Additionally, any other custom functions should be tested, whether they are exposed to remote methods or not.