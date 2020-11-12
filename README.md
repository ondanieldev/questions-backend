# Questions Application - Backend

## Introduction

This API was developed to provide services to this React Native project: [Questions Frontend](https://github.com/stemDaniel/questions-frontend).

## Steps to run this project:

1. Run `npm i` command to build node_modules
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run dev` command to start server in develop mode

## RESTfull API routes:
 
| METHOD | ROUTE | REQ | RES | FUNCTION |
|-|-|-|-|-|
| POST | /room || {roomId, studentCode, teacherCode} | Create a new room |
| POST | /question | {roomId, content, alternativeA, alternativeB, alternativeC, alternativeD, correct} || Create a new question |
| POST | /enjoy | {studentCode} | questions[{question}] | Enjoy into a room as a student |
| POST | /answer | {questionId, alternative} || Answer a question |
| POST | /stats | {teacherCode} | questions[{question}] | Enjoy into a room as a teacher |
