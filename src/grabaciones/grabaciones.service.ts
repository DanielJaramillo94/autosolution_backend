import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grabacion } from './grabacion.entity';
import { GrabacionDTO } from './grabacion.dto';

@Injectable()
export class GrabacionesService {
    constructor(@InjectRepository(Grabacion) private grabacionesRepository: Repository<Grabacion>) {}

    async findAll() {
        const grabaciones =  await this.grabacionesRepository.find();
        return grabaciones;
    }

    async findById(grabacionId: number) {
        const grabaciones =  await this.grabacionesRepository.findByIds([grabacionId]);
        return grabaciones[0] ? grabaciones[0] : grabaciones;
    }

    async findArchivos(grabacionId: number) {
        const grabacion = await this.grabacionesRepository.find({
            where: { id: grabacionId },
            relations: ['archivos'],
        });
        
        return grabacion[0] ? grabacion[0].archivos : [];
    }

    async create(newGrabacion: GrabacionDTO) {
        return this.grabacionesRepository.save(newGrabacion);
    }

    async replace(grabacionId: number, newGrabacion: GrabacionDTO) {
        return this.grabacionesRepository.update(grabacionId, newGrabacion);
    }

    async delete(grabacionId: number) {
        const grabacion = await this.grabacionesRepository.findByIds([grabacionId])
        return this.grabacionesRepository.remove(grabacion[0]);
    }
}
