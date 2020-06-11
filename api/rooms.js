module.exports = app => {
    // validation functions
    const { existsOrError } = app.api.validation
    // db functions
    const { connection, Question, Room } = app.db

    const enjoy = async (req, res) => {
        try{
            // verify if client sent correctly params by body
            existsOrError(req.body.studentCode, 'Código não informado!')
        }catch(msg){
            // client error
            res.status(400).send(msg)
        }

        try{
            // get repositories
            const roomRepo = connection.getRepository(Room)
            const questionRepo = connection.getRepository(Question)
            
            // fund question by student code and verify if the code is valid
            const room = await roomRepo.findOne({relations: ["question"], studentCode: req.body.studentCode})
            existsOrError(room, 'Código inválido!')
            const question = await questionRepo.findOne({id: room.question.id})

            // remove correct alternative from response to avoid to cheat
            delete question.correct

            // send question data as response
            res.status(200).send(question)
        }catch(err){
            // server error
            res.status(500).send(err)
        }
    }

    // display functions to access them by consign
    return { enjoy }
}