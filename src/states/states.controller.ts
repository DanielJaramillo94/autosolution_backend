import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { StatesService } from './states.service';
import { StateDTO } from './state.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('states')
export class StatesController {
    constructor (private statesService: StatesService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    findAll() {
        return this.statesService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async findById(@Param('id') stateId: number) {
        return await this.statesService.findById(stateId);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async create(@Body() newState: StateDTO){
        return this.statesService.create(newState);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async replace(@Param('id') stateId: number, @Body() newState: StateDTO) {
        return this.statesService.replace(stateId, newState);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async delete(@Param('id') stateId) {
        return this.statesService.delete(stateId);
    }
}
