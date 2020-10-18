import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reunion } from './reunion.entity';
import { ReunionDTO } from './reunion.dto';

@Injectable()
export class ReunionesService {
    constructor(@InjectRepository(Reunion) private reunionesRepository: Repository<Reunion>) {}

    async findAll(limit: number, offset: number) {
        const reuniones =  await this.reunionesRepository.find({
            take: limit,
            skip: offset
        });
        return reuniones;
    }

    async findById(reunionId: number) {
        const reuniones =  await this.reunionesRepository.findByIds([reunionId]);
        return reuniones[0] ? reuniones[0] : reuniones;
    }

    async findByIdSistemaExterno(id: string) {
        const reunion =  await this.reunionesRepository.findOne({
            where: [
              { idsistemaexterno: id},
            ]
          })
        return reunion;
    }

    async findByUuid(uuid: string) {
        const reunion =  await this.reunionesRepository.findOne({
            where: [
              { uuid: uuid},
            ]
          })
        return reunion;
    }

    async findOcurrencias(reunionId: number) {
        const reunion = await this.reunionesRepository.find({
            where: { id: reunionId },
            relations: ['ocurrencias'],
        });
        
        return reunion[0] ? reunion[0].ocurrencias : [];
    }

    async create(newReunion: ReunionDTO) {
        return this.reunionesRepository.save(newReunion);
    }

    async replace(reunionId: number, newReunion: ReunionDTO) {
        return this.reunionesRepository.update(reunionId, newReunion);
    }

    async delete(reunionId: number) {
        let reunion = await this.reunionesRepository.findByIds([reunionId])
        return this.reunionesRepository.remove(reunion[0]);
    }

    async count() {
        return await this.reunionesRepository.count();
    }
}
