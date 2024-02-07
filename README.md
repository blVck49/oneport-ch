# Sharply API

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

# Table of Contents

-   [General Info](#general-info)
-   [Technologies](#technologies)
-   [3rd party services](#services)
-   [Setup](#setup)

### General Info

Backend codebase of the Oneport assessment app

### Technologies

This project is built with:

-   [Nodejs/ExpressJS](https://expressjs.com)
-   [MongoDB](https://cloud.mongodb.com)
-   [RabbitMQ](https://rabbitmq.com/)

### Services

-   [MongoDB](https://cloud.mongodb.com): Database management
-   [Docker]
-   [RabbitMQ]

### Conventions

-   **File Structure**
    MRC file structure
    Entities are self-contained.

```
├── controllers
│ ├── task.js
│ ├── user.js
| ├── subscribe.js
├── routes
| ├──task.js
│ ├── user.js
| ├── subscribe.js
├── models
│ ├── task.js
│ ├── user.js
| ├── subscribe.js
```

-   **Naming**

    -   Models are capitalized and singular e.g.
        `const Model = model("User", schema);`
    -   `create`, `get`, `fetch`, `update` and `delete` are the conventional function names for CRUD actions.


### Setup

#### Installation

To run this project,

```
npm install
npm run start:dev

```
