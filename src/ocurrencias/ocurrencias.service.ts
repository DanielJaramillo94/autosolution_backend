import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ocurrencia } from './ocurrencia.entity';
import { OcurrenciaDTO } from './ocurrencia.dto';

@Injectable()
export class OcurrenciasService {
    constructor(@InjectRepository(Ocurrencia) private ocurrenciasRepository: Repository<Ocurrencia>) {}

    async findAll() {
        const ocurrencias =  await this.ocurrenciasRepository.find();
        return ocurrencias;
    }

    async findById(ocurrenciaId: number) {
        const ocurrencias =  await this.ocurrenciasRepository.findByIds([ocurrenciaId]);
        return ocurrencias[0] ? ocurrencias[0] : ocurrencias;
    }

    async findGrabaciones(grabacionId: number) {
        const ocurrencia = await this.ocurrenciasRepository.find({
            where: { id: grabacionId },
            relations: ['grabaciones'],
        });
        
        return ocurrencia[0] ? ocurrencia[0].grabaciones : [];
    }

    async create(newOcurrencia: OcurrenciaDTO) {
        return this.ocurrenciasRepository.save(newOcurrencia);
    }

    async replace(ocurrenciaId: number, newOcurrencia: OcurrenciaDTO) {
        return this.ocurrenciasRepository.update(ocurrenciaId, newOcurrencia);
    }

    async delete(ocurrenciaId: number) {
        const ocurrencia = await this.ocurrenciasRepository.findByIds([ocurrenciaId])
        return this.ocurrenciasRepository.remove(ocurrencia[0]);
    }
}
