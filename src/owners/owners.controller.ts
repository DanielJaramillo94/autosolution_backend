import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnerDTO } from './owner.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Controller('owners')
export class OwnersController {
    constructor (private ownersService: OwnersService, private vehicleService : VehiclesService) {}

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

    @UseGuards(JwtAuthGuard)
    @Get('/showDetails/:id')
    async findByIdentifier(@Param('id') ownerId: number) {
        const ownerInfo = await this.ownersService.findByIdentifier(ownerId);
        const vehiclePromises = ownerInfo.vehicleXowners.map(async element =>{
            const vehicle = await this.vehicleService.findById(element.vehicleId)
            return vehicle
        })
        const vehicles = await Promise.all(vehiclePromises)
        return {ownerInfo, vehicles}
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
