import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnerDTO } from './owner.dto';
import { EmailJwtAuthGuard } from '../auth/guards/emailJwt-auth.guard';
import { VehiclesService } from '../vehicles/vehicles.service';

@Controller('owners')
export class OwnersController {
    constructor (private ownersService: OwnersService, private vehicleService : VehiclesService) {}

    @Get()
    findAll() {
        return this.ownersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') ownerId: number) {
        return await this.ownersService.findById(ownerId);
    }

    @UseGuards(EmailJwtAuthGuard)
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
    async create(@Body() newOwner: OwnerDTO){
        return this.ownersService.create(newOwner);
    }

    @Put(':id')
    async replace(@Param('id') ownerId: number, @Body() newOwner: OwnerDTO) {
        return this.ownersService.replace(ownerId, newOwner);
    }

    @Delete(':id')
    async delete(@Param('id') ownerId) {
        return this.ownersService.delete(ownerId);
    }

}
