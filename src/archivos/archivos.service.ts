import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Archivo } from './archivo.entity';
import { ArchivoDTO } from './archivo.dto';

@Injectable()
export class ArchivosService {
    constructor(@InjectRepository(Archivo) private archivosRepository: Repository<Archivo>) {}

    async findAll() {
        const archivos =  await this.archivosRepository.find();
        return archivos;
    }

    async findById(archivoId: number) {
        const archivos =  await this.archivosRepository.findByIds([archivoId]);
        return archivos[0] ? archivos[0] : archivos;
    }

    async create(newArchivo: ArchivoDTO) {
        return this.archivosRepository.save(newArchivo);
    }

    async replace(archivoId: number, newArchivo: ArchivoDTO) {
        return this.archivosRepository.update(archivoId, newArchivo);
    }

    async delete(archivoId: number) {
        const archivo = await this.archivosRepository.findByIds([archivoId])
        return this.archivosRepository.remove(archivo[0]);
    }
}
