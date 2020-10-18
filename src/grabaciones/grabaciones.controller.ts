import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { GrabacionesService } from './grabaciones.service';
import { GrabacionDTO } from './grabacion.dto';

@Controller('grabaciones')
export class GrabacionesController {
    constructor (private grabacionesService: GrabacionesService) {}

    @Get()
    findAll() {
        return this.grabacionesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') grabacionId: number) {
        return await this.grabacionesService.findById(grabacionId);
    }

    @Get(':id/archivos')
    async findArchivos(@Param('id') grabacionId: number) {
        return this.grabacionesService.findArchivos(grabacionId);
    }

    @Post()
    async create(@Body() newGrabacion: GrabacionDTO){
        return this.grabacionesService.create(newGrabacion);
    }

    @Put(':id')
    async replace(@Param('id') grabacionId: number, @Body() newGrabacion: GrabacionDTO) {
        return this.grabacionesService.replace(grabacionId, newGrabacion);
    }

    @Delete(':id')
    async delete(@Param('id') grabacionId) {
        return this.grabacionesService.delete(grabacionId);
    }
}
