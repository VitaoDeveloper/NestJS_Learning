import { 
    Column, CreateDateColumn, Entity, 
    OneToMany, PrimaryGeneratedColumn 
} from "typeorm";

import { Book } from "../../books/entities/book.entity";
import type { UUID } from "crypto";

@Entity('genres')
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @Column({ unique: true, length: 80 })
    name: string

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date

    @OneToMany(() => Book, book => book.genreRelation)
    books: Book[]
}
