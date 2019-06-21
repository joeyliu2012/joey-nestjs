import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()

export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('longtext', { nullable: true })
    body: string;

    @CreateDateColumn()
    created: Date;

    @CreateDateColumn()
    updated: Date;
}