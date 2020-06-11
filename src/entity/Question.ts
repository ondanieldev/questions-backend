import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from "typeorm"
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

    @OneToOne(() => Room, room => room.question)
    room: Room

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]
}