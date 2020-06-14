module.exports = app => {
    const { existsOrError, onEnumOrError } = app.api.validation
    const { connection, Question, Room } = app.db

    const create = async (req, res) => {
        try{
            existsOrError(req.body.roomId, 'Sala não informada!')
            existsOrError(req.body.content, 'Conteúdo não informado!')
            existsOrError(req.body.alternativeA, 'Alternativa A não informada!')
            existsOrError(req.body.alternativeB, 'Alternativa B não informada!')
            existsOrError(req.body.alternativeC, 'Alternativa C não informada!')
            existsOrError(req.body.alternativeD, 'Alternativa D não informada!')
            existsOrError(req.body.correct, 'Alternativa correta não informada!')
            onEnumOrError(req.body.correct.toLowerCase(), ['a', 'b', 'c', 'd'], 'Alternativa correta inválida!')
        }catch(msg){
            return res.status(400).send(msg)
        }

        try{
            const questionRepo = connection.getRepository(Question)
            const roomRepo = connection.getRepository(Room)

            const question = new Question()
            question.content = req.body.content
            question.alternativeA = req.body.alternativeA
            question.alternativeB = req.body.alternativeB
            question.alternativeC = req.body.alternativeC
            question.alternativeD = req.body.alternativeD
            question.correct = req.body.correct.toLowerCase()
            question.room = await roomRepo.findOne({id: req.body.roomId})
            await questionRepo.save(question)

            res.status(204).send()
        }catch(msg){
            return res.status(500).send(msg)
        }
    }

    const getByRoom = async (req, res) => {
        try{
            existsOrError(req.body.studentCode, 'Código não informado!')
            const room = await connection.getRepository(Room).findOne({studentCode: req.body.studentCode})
            existsOrError(room, 'Código inválido!')
        }catch(msg){
            return res.status(400).send(msg)
        }

        try{
            const questionRepo = connection.getRepository(Question)
            const roomRepo = connection.getRepository(Room)
            
            const room = await roomRepo.findOne({studentCode: req.body.studentCode})
            const questions = await questionRepo.find({room: room})

            questions.forEach(question => {
                delete question.correct
            })

            res.status(200).send(questions)
        }catch(msg){
            return res.status(500).send(msg)
        }
    }

    return { create, getByRoom }
}