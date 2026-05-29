import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { UUID } from 'crypto';
@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private repo: Repository<Genre>,
  ) {}

  create(dto: CreateGenreDto) {
    const genre = this.repo.create(dto);
    return this.repo.save(genre);
  }

  findAll() {
    return this.repo.find({ relations: { books: true } });
  }

  async findOne(id: UUID) {
    const genre = await this.repo.findOne({
      where: { id },
      relations: { books: true },
    }); 
    if (!genre) throw new NotFoundException(`Gênero #${id} não encontrado`);
    return genre;
  }

  async findByName(name: string) {
    return this.repo.findOne({ where: { name } });
  }

  async update(id: UUID, dto: UpdateGenreDto) {
    const genre = await this.findOne(id);
    Object.assign(genre, dto);
    return this.repo.save(genre);
  }

  async remove(id: UUID) {
    const genre = await this.findOne(id);
    return this.repo.remove(genre);
  }
}
