import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { VehicleXownersService } from './vehiclesXowners.service';
import { VehicleXownerDTO } from './vehicleXowner.dto';

@Controller('vehicleXowners')
export class VehicleXownersController {
    constructor (private vehicleXownersService: VehicleXownersService) {}

    @Get()
    findAll() {
        return this.vehicleXownersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') vehicleXownerId: number) {
        return await this.vehicleXownersService.findById(vehicleXownerId);
    }

    @Post()
    async create(@Body() newVehicleXowner: VehicleXownerDTO){
        return this.vehicleXownersService.create(newVehicleXowner);
    }

    @Put(':id')
    async replace(@Param('id') vehicleXownerId: number, @Body() newVehicleXowner: VehicleXownerDTO) {
        return this.vehicleXownersService.replace(vehicleXownerId, newVehicleXowner);
    }

    @Delete(':id')
    async delete(@Param('id') vehicleXownerId) {
        return this.vehicleXownersService.delete(vehicleXownerId);
    }
}
