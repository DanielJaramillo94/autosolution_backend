import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivoDTO } from './archivo.dto';

@Controller('archivos')
export class ArchivosController {
    constructor (private archivosService: ArchivosService) {}

    @Get()
    findAll() {
        return this.archivosService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') archivoId: number) {
        return await this.archivosService.findById(archivoId);
    }

    @Post()
    async create(@Body() newArchivo: ArchivoDTO){
        return this.archivosService.create(newArchivo);
    }

    @Put(':id')
    async replace(@Param('id') archivoId: number, @Body() newArchivo: ArchivoDTO) {
        return this.archivosService.replace(archivoId, newArchivo);
    }

    @Delete(':id')
    async delete(@Param('id') archivoId) {
        return this.archivosService.delete(archivoId);
    }
}
