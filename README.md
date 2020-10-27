<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
## Description

Project created for programming web course

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Important⚠️

There should be configured next environmental variables on the root of the project (level of _package.json_ and _README.MD_ files) on a file named **.env**

APP_PORT = port_where_app_runs<br />
DATABASE_NAME = database_name<br />
DATABASE_HOST = localhost_or_database_host<br />
DATABASE_PORT = 3306_default_to_MariaDB_and_MySQL<br />
DATABASE_USER = username_on_BD<br />
DATABASE_PASSWORD = database_password<br />

JWT_SECRET = secret_to_sign_and_verify_JWT

_optional_<br />
MODE = dev<br />
Shows on console SQL sentences executed by TypeORM and sync models with DB. Therefore is recommended to set it when you want to mount a scheme on a empty DB.
