import { Controller, Get, Param, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionDTO } from './reunion.dto';

@Controller('reuniones')
export class ReunionesController {
    constructor (private reunionesService: ReunionesService) {}
    
    @Get()
    findAll(
        @Query('limit') limit = 1,
        @Query('offset') offset = 0
    ) {
        return this.reunionesService.findAll(limit, offset);
    }

    @Get('/count')
    async count() {
        return await this.reunionesService.count();
    }

    @Get(':id')
    async findById(@Param('id') reunionId: number) {
        return await this.reunionesService.findById(reunionId);
    }

    @Get(':id/ocurrencias')
    async findOcurrencias(@Param('id') reunionId: number) {
        return this.reunionesService.findOcurrencias(reunionId);
    }

    @Post()
    async create(@Body() newReunion: ReunionDTO){
        return this.reunionesService.create(newReunion);
    }

    @Put(':id')
    async replace(@Param('id') reunionId: number, @Body() newReunion: ReunionDTO) {
        return this.reunionesService.replace(reunionId, newReunion);
    }

    @Delete(':id')
    async delete(@Param('id') reunionId) {
        return this.reunionesService.delete(reunionId);
    }
}
