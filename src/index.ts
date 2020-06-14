// typeorm imports
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Question } from "./../src/entity/Question"
import { Room } from "./../src/entity/Room"
import { Answer } from "./../src/entity/Answer"

// express imports
const app = require('express')()
const consign = require('consign')

createConnection().then(async connection => {
    // display db to access by consign
    app.db = {
        connection,
        Question,
        Answer,
        Room
    }

    // display all archives to access their functions by consign
    consign()
        .then('/config/middlewares.js')
        .then('/api/validation.js')
        .then('/api')
        .then('/config/routes.js')
        .into(app)

    // start server
    app.listen(3003, _ =>{
        console.log('Backend running!')
    })
}).catch(error => console.log(error));