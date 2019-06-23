import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}