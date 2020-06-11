module.exports = app => {
    app.route('/questions')
        .post(app.api.questions.create)

    app.route('/rooms')
        .post(app.api.rooms.enjoy)

    app.route('/answers')
        .post(app.api.answers.resolve)
}