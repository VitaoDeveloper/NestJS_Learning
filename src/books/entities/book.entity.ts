import { 
    Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn, ManyToOne, JoinColumn 
} from 'typeorm';

import { Genre } from '../../genres/entities/genre.entity';
import type { UUID } from 'crypto';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: UUID; 

  @Column({ unique: true, length: 80 })
  name: string;

  // coluna FK — armazena o nome do gênero
  @Column({ name: 'genre', nullable: true })
  genre: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // relação — carrega o objeto Genre completo
  @ManyToOne(() => Genre, genre => genre.books, { nullable: true })
  @JoinColumn({ name: 'genre', referencedColumnName: 'name' })
  genreRelation: Genre;
}