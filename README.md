# Diagonalteam.online

## Project descriptions (working on it)

just a movie CRUD (**C**reate, **R**ead, **u**pdate, **D**elete) manager with a Static login (by now), multiple joins (Relations one-to-many)

Movie and characters have image fields, is automated. You can not insert a own image, it's taken from an wikipedia API

### Whan can I Do?

* Interact with the database with real time update (working on it)
* Create a PDF Reports (working on it)
* Send to your email that PDF reports (working on it)

#### Development STACKS

* React (npx create-react-app) plus Material-UI (Bootstrap 4.6.x for the CSS)
* Node 16.13.2 (TypeScript)
* MySQL
* Express
* Ubuntu
* Gitkraken
* Apache2
* axios

## TODO

### FRONT-END

* connect all Forms to backend sync
* Implement Material-Select - adding movie
* implement views movies,genres, characters {insert,update,delete}
* Users can't select image (just because). is automated process using api

### BACK-END

* req.body/params validations (express-validator)
* Create a cronjob to delete database data each 12hrs
* implement pdf (@types/html-pdf)
* implements bcrypt
* use a real Authentication (jwt,passport)
* implement nodemailer
* Should have a Cronjob that execute a drop database sentence each 12 hrs

### Database (MYSQL)

Database is working well

#### Database structure

![Database Join Structure](/database.png "Database Join Structure")
