# Loopback API Skeleton

## Setup

* 1 - clone this repo down into whatever folder your project will be named. `git clone https://github.com/ZyMoEntertainment/loopback-skeleton.git my-project`
* 2 - delete the .git folder to clear out the skeleton commit history:
`rm -rf .git`
`git init`
`git add .`
`git commit -m"initial commit"`
* 3 - open up `package.json` and change the name to whatever your project is named.
* 4 - run `npm install`
* 5 - create and configure your datasources.local.json file to point at whatever data source you are using. There is a sample file contained in the repo. We typically use postgres and host on an aws rds instance, here is an example of how that might look:

```
{
  "db": {
    "host": "somewhere.rds.amazonaws.com",
    "port": "5432",
    "database": "homeajar-dev",
    "username": "username",
    "password": "password",
    "name": "postgres",
    "debug": true,
    "connector": "postgresql"
  }
}
```

By default the app runs on an in memory database, so you don't necessarily _have_ to do this to get started. If you're just interested in learning loopback or testing out an idea the memory adapter works great.

## Running Locally

If you use visual studio code, there are launch configurations in place already. Local will spin up a local instance pointed at port 3000, and Test will run the unit tests. You should use VS Code. It's free, and it's nice.

There are placeholder configurations for running against different environments in case you ever need to point there for troubleshooting, they would need datasources files created to do this though.

## Running Tests

The skeleton comes with unit testing, and a really easy way to run the tests assuming you're using VS Code. Just run the Test configuration. As you add features to the app make sure to write tests for them, or you'll get a rash. The only cure is to write tests.

## Further Reading

Most of the folders within the source have readme's explaining what they are and what they're for, and the example files are pretty well commented. Read over them to get a better understanding of where things go and how to follow best practices.

Check out the [loopback docs](https://loopback.io/doc/en/lb3/) for more information.
