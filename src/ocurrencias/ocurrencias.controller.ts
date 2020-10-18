import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { OcurrenciasService } from './ocurrencias.service';
import { OcurrenciaDTO } from './ocurrencia.dto';

@Controller('ocurrencias')
export class OcurrenciasController {
    constructor (private ocurrenciasService: OcurrenciasService) {}

    @Get()
    findAll() {
        return this.ocurrenciasService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') ocurrenciaId: number) {
        return await this.ocurrenciasService.findById(ocurrenciaId);
    }

    @Get(':id/grabaciones')
    async findGrabaciones(@Param('id') ocurrenciaId: number) {
        return this.ocurrenciasService.findGrabaciones(ocurrenciaId);
    }

    @Post()
    async create(@Body() newOcurrencia: OcurrenciaDTO){
        return this.ocurrenciasService.create(newOcurrencia);
    }

    @Put(':id')
    async replace(@Param('id') ocurrenciaId: number, @Body() newOcurrencia: OcurrenciaDTO) {
        return this.ocurrenciasService.replace(ocurrenciaId, newOcurrencia);
    }

    @Delete(':id')
    async delete(@Param('id') ocurrenciaId) {
        return this.ocurrenciasService.delete(ocurrenciaId);
    }
}
