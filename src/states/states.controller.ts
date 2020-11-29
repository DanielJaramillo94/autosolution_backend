import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { StatesService } from './states.service';
import { StateDTO } from './state.dto';

@Controller('states')
export class StatesController {
    constructor (private statesService: StatesService) {}

    @Get()
    findAll() {
        return this.statesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') stateId: number) {
        return await this.statesService.findById(stateId);
    }

    @Post()
    async create(@Body() newState: StateDTO){
        return this.statesService.create(newState);
    }

    @Put(':id')
    async replace(@Param('id') stateId: number, @Body() newState: StateDTO) {
        return this.statesService.replace(stateId, newState);
    }

    @Delete(':id')
    async delete(@Param('id') stateId) {
        return this.statesService.delete(stateId);
    }
}
