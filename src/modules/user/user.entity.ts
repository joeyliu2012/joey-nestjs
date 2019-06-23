import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {unique: true})
    name: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created: Date;

    @CreateDateColumn()
    updated: Date;
}