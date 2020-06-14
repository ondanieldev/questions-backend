module.exports = app => {
    const { existsOrError } = app.api.validation
    const { connection, Room, Question, Answer } = app.db

    async function genCode(user) {
        const roomRepo = connection.getRepository(Room)

        let code = Math.floor(Math.random() * 1000000 + 100000).toString()
        if(code.length > 6) code = code.slice(0, 6)

        if(user === 'student'){
            const studentCodeFromDB = await roomRepo.findOne({studentCode: code})
            if(studentCodeFromDB) return genCode()
        }else if(user === 'teacher'){
            const teacherCodeFromDB = await roomRepo.findOne({teacherCode: code})
            if(teacherCodeFromDB) return genCode()
        }

        return code
    }

    const create = async (req, res) => {
        try{
            const roomRepo = connection.getRepository(Room)

            const room = new Room()
            room.studentCode = await genCode('student')
            room.teacherCode = await genCode('teacher')
            const data = await roomRepo.save(room)

            res.status(200).send({
                'roomId': data.id,
                'studentCode': data.studentCode,
                'teacherCode': data.teacherCode
            })
        }catch(msg){
            return res.status(500).send(msg)
        }
    }

    const getStats = async (req, res) => {
        try{
            existsOrError(req.body.teacherCode, 'Código não informado!')
            const room = await  connection.getRepository(Room).findOne({teacherCode: req.body.teacherCode})
            existsOrError(room, 'Código inválido!')
        }catch(msg){
            return res.status(400).send(msg)
        }

        try{
            const roomRepo = connection.getRepository(Room)
            const questionRepo = connection.getRepository(Question)

            const room = await roomRepo.findOne({ teacherCode: req.body.teacherCode })
            const questions = await questionRepo
                .createQueryBuilder("question")
                .leftJoinAndSelect("question.answers", "answer")
                .where("question.room = :room")
                .setParameters({ room: room.id })
                .getMany();
            

            questions.forEach(question => {
                question.answersNumber = 0
                question.correctsNumber = 0
                question.answers.forEach(answer => {
                    ++question.answersNumber
                    if(answer.alternative.toLowerCase() === question.correct.toLowerCase())
                        ++question.correctsNumber
                })
                question.percentNumber = question.correctsNumber * 100 / question.answersNumber
            })

            res.status(200).send(questions)
        }catch(msg){
            return res.status(500).send(msg)
        }
    }
 
    return { create, getStats }
}