import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class File {
    @PrimaryColumn()
    id: number;

    @Column()
    originalname: string;

    @Column()
    filename: string;

    @Column()
    MimeType: string;

    @Column()
    size: number;  
}