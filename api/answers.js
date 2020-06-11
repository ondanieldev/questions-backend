module.exports = app => {
    // validation functions
    const { existsOrError } = app.api.validation
    // db functions
    const { connection, Question, Answer } = app.db

    const resolve = async (req, res) => {
        try{
            // verify if client sent correctly params by body
            existsOrError(req.body.alternative, 'Alternativa não informada!')
        }catch(msg){
            // client error
            res.status(400).send(msg)
        }

        try{
            // get repositories
            const answerRepo = connection.getRepository(Answer)
            const questionRepo = connection.getRepository(Question)

            // get question
            const question = await questionRepo.findOne({id: req.body.questionId})

            // create a answer
            const answer = new Answer()
            answer.alternative = req.body.alternative.toLowerCase()
            answer.question = question

            // save answer
            await answerRepo.save(answer)

            // send question data as response
            res.status(204).send()
        }catch(err){
            // server error
            res.status(500).send(err)
        }
    }

    // display functions to access them by consign
    return { resolve }
}