import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    GenresModule, // ← importa para ter acesso ao GenresService
  ],
  controllers: [BooksController],
  providers:   [BooksService],
})
export class BooksModule {}
