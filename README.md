# Questions app backend

Steps to run this project:

1. Run `npm i` command to build node_modules
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run dev` command to start server in develop mode

RESTfull API routes:
 
| METHOD | ROUTE     | REQ                                                | RES                                |
|--------|-----------|----------------------------------------------------|------------------------------------|
| POST | /room || {roomId, studentCode, teacherCode} |
| POST   | /question | {roomId, content, alternativeA, alternativeB, alternativeC, alternativeD, correct} |                                    |
| POST   | /enjoy    | {studentCode}                                      | questions[{question}]              |
| POST   | /answer   | {questionId, alternative}                          |                                    |
| POST   | /stats    | {teacherCode}                                      | questions[{question}]              |
