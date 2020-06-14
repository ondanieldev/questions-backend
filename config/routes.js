module.exports = app => {
    app.post('/room', app.api.room.create)
    app.post('/question', app.api.question.create)
    app.post('/enjoy', app.api.question.getByRoom)
    app.post('/answer', app.api.answer.resolve)
    app.post('/stats', app.api.room.getStats)
}