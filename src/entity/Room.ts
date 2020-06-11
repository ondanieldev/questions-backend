import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
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

    @Column()
    hitsNumber: number

    @OneToOne(() => Question, question => question.room)
    @JoinColumn()
    question: Question
}