import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleDTO } from './vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
    constructor (private vehiclesService: VehiclesService) {}

    @Get()
    findAll() {
       return this.vehiclesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') vehicleId: number) {
        return await this.vehiclesService.findById(vehicleId);
    }

    @Post()
    async create(@Body() newVehicle: VehicleDTO){
        return this.vehiclesService.create(newVehicle);
    }

    @Put(':id')
    async replace(@Param('id') vehicleId: number, @Body() newVehicle: VehicleDTO) {
        return this.vehiclesService.replace(vehicleId, newVehicle);
    }

    @Delete(':id')
    async delete(@Param('id') vehicleId) {
       return this.vehiclesService.delete(vehicleId);
    }
}
