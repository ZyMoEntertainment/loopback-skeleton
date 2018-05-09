# Loopback API Skeleton

## Developer Notes

* Change datasources.local-sample.json to datasources.local.json and setup your database connection information to connect

* This uses JWT Authentication. To change the payload look at jwt.js in the bootscripts and change this line  `const token = jwt.sign({id: this.id, email: this.email}, secretKey, {expiresIn});` to something like ` const token = jwt.sign({id: this.id, email: this.email, someProperty: this.propertyInModel}, secretKey, {expiresIn});`

* You may also need to change the user model in the jwt.js and the admin-users.js from `const CompanyUser = app.models.User;` to `const CompanyUser = app.models.MyUserModel;`
#### Sample datasources.local.json

```{
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
}```