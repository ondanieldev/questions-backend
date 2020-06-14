import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Room } from "./Room"
import { Answer } from "./Answer"

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    content: string

    @Column()
    alternativeA: string

    @Column()
    alternativeB: string

    @Column()
    alternativeC: string

    @Column()
    alternativeD: string

    @Column({
        length: 1
    })
    correct: string

    @ManyToOne(() => Room, room => room.questions)
    room: Room

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]
}