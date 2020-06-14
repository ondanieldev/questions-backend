import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Question } from "./Question"

@Entity()
export class Room {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 6
    })
    studentCode: string

    @Column({
        length: 6
    })
    teacherCode: string

    @OneToMany(() => Question, question => question.room)
    questions: Question[]
}