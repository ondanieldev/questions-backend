module.exports = app => {
    // validation functions
    const { existsOrError, onEnumOrError } = app.api.validation
    // db functions
    const { connection, Question, Room } = app.db

    async function genCode(user) {
        // room table
        const roomRepo = connection.getRepository(Room)

        // gen 6-digits random code 
        let code = Math.floor(Math.random() * 1000000 + 100000).toString()
        if(code.length > 6) code = code.slice(0, 6)

        // verify if code already exists. in case of this, re random
        if(user === 'student'){
            const studentCodeFromDB = await roomRepo.findOne({studentCode: code})
            if(studentCodeFromDB) return genCode()
        }else if(user === 'teacher'){
            const teacherCodeFromDB = await roomRepo.findOne({teacherCode: code})
            if(teacherCodeFromDB) return genCode()
        }

        // code generated!
        return code
    }

    const create = async (req, res) => {
        try{
            // verify if client sent correctly params by body
            existsOrError(req.body.content, 'Conteúdo não informado!')
            existsOrError(req.body.alternativeA, 'Alternativa A não informada!')
            existsOrError(req.body.alternativeB, 'Alternativa B não informada!')
            existsOrError(req.body.alternativeC, 'Alternativa C não informada!')
            existsOrError(req.body.alternativeD, 'Alternativa D não informada!')
            existsOrError(req.body.correct, 'Alternativa correta não informada!')
            onEnumOrError(req.body.correct.toLowerCase(), ['a', 'b', 'c', 'd'], 'Alternativa correta inválida!')
        }catch(msg){
            // client error
            return res.status(400).send(msg)
        }

        try{
            // create a question
            const question = new Question()
            question.content = req.body.content
            question.alternativeA = req.body.alternativeA
            question.alternativeB = req.body.alternativeB
            question.alternativeC = req.body.alternativeC
            question.alternativeD = req.body.alternativeD
            question.correct = req.body.correct.toLowerCase()

            // create a room
            const room = new Room()
            room.studentCode = await genCode(connection, 'student')
            room.teacherCode = await genCode(connection, 'teacher')
            room.hitsNumber = 0
            room.question = question

            // get repositories
            const questionRepo = connection.getRepository(Question)
            const roomRepo = connection.getRepository(Room)

            // save data
            await questionRepo.save(question)
            await roomRepo.save(room)

            // send codes as response
            res.status(200).send({
                'studentCode': room.studentCode,
                'teacherCode': room.teacherCode
            }) 
        }catch(msg){
            // server error
            return res.status(500).send(msg)
        }
    }

    // display functions to access them by consign
    return { create }
}