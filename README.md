<div align="center">
  <div>
    <h1>Questions</h1>
  </div>
  <br>
  <br>
  <div>
    <a href="https://img.shields.io/github/v/tag/stemDaniel/questions-backend?color=%2368d391&style=for-the-badge">
      <img src="https://img.shields.io/github/v/tag/stemDaniel/questions-backend?color=%2368d391&style=for-the-badge">
    </a>
    <a href="https://img.shields.io/github/license/stemDaniel/questions-backend?color=%2368d391&style=for-the-badge">
      <img src="https://img.shields.io/github/license/stemDaniel/questions-backend?color=%2368d391&style=for-the-badge">
    </a>
  </div>
  <hr>
</div>

## Introduction

Questions is a school mobile app that helps teachers to interact with their students by creating questions rooms.

## Front-end

This repository contains the code related to [Questions Back-end](https://github.com/stemDaniel/questions-backend). If you want to see the front-end repository, please check [Questions Front-end](https://github.com/stemDaniel/questions-frontend).

## Features

- Create room
- Create questions
- Answer questions
- View results
- And more!

## Endpoints

| METHOD | PATH      | SHORT DESCRIPTION              |
| ------ | --------- | ------------------------------ |
| POST   | /room     | Create a new room              |
| POST   | /question | Create a new question          |
| POST   | /enjoy    | Enjoy into a room as a student |
| POST   | /answer   | Answer a question              |
| POST   | /stats    | Enjoy into a room as a teacher |

## How to run

1. Install project dependencies:

   `npm install` or `yarn install`

2. Fill `ormconfig.json` with your database credentials.

3. Run project:

   `npm run dev` or `yarn dev`

## License

MIT © [Daniel Oliveira](https://ondaniel.com.br/)
