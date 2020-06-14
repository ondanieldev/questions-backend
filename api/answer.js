module.exports = app => {
    const { existsOrError } = app.api.validation
    const { connection, Question, Answer } = app.db

    const resolve = async (req, res) => {
        try{
            existsOrError(req.body.questionId, 'Questão não selecionada!')
            existsOrError(req.body.alternative, 'Alternativa não informada!')
        }catch(msg){
            return res.status(400).send(msg)
        }

        try{
            const answerRepo = connection.getRepository(Answer)
            const questionRepo = connection.getRepository(Question)

            const question = await questionRepo.findOne({id: req.body.questionId})

            const answer = new Answer()
            answer.alternative = req.body.alternative.toLowerCase()
            answer.question = question

            await answerRepo.save(answer)

            res.status(204).send()
        }catch(err){
            return res.status(500).send(err)
        }
    }

    return { resolve }
}