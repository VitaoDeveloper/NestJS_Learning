import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { GenresService } from '../genres/genres.service';
import { UUID } from 'crypto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
    private genresService: GenresService, // injetado
  ) {}

  async create(dto: CreateBookDto) {
    // valida se o gênero existe antes de criar
    if (dto.genre) {
      const exists = await this.genresService.findByName(dto.genre);
      if (!exists)
        throw new BadRequestException(`Gênero "${dto.genre}" não existe`);
    }
    const book = this.repo.create(dto);
    return this.repo.save(book);
  }

  findAll() {
    return this.repo.find({ relations: { genreRelation: true } });
  }

  async findOne(id: UUID) {
    const book = await this.repo.findOne({
      where: { id },
      relations: { genreRelation: true },
    });
    if (!book) throw new NotFoundException(`Livro #${id} não encontrado`);
    return book;
  }

  async update(id: UUID, dto: UpdateBookDto) {
    const book = await this.findOne(id);
    if (dto.genre) {
      const exists = await this.genresService.findByName(dto.genre);
      if (!exists)
        throw new BadRequestException(`Gênero "${dto.genre}" não existe`);
    } 
    Object.assign(book, dto);
    return this.repo.save(book);
  }

  async remove(id: UUID) {
    const book = await this.findOne(id);
    return this.repo.remove(book);
  }
}
