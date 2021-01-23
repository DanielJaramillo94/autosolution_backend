import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnerDTO } from './owner.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('owners')
export class OwnersController {
    constructor (private ownersService: OwnersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.ownersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') ownerId: number) {
        return await this.ownersService.findById(ownerId);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Supervisor, Role.Mechanic)
    async create(@Body() newOwner: OwnerDTO){
        return this.ownersService.create(newOwner);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Supervisor, Role.Mechanic)
    async replace(@Param('id') ownerId: number, @Body() newOwner: OwnerDTO) {
        return this.ownersService.replace(ownerId, newOwner);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Supervisor, Role.Mechanic)
    async delete(@Param('id') ownerId) {
        return this.ownersService.delete(ownerId);
    }
}
