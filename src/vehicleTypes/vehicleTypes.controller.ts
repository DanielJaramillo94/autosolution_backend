import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { VehicleTypesService } from './vehicleTypes.service';
import { VehicleTypeDTO } from './vehicleType.dto';

@Controller('vehicleTypes')
export class VehicleTypesController {
    constructor (private vehicleTypesService: VehicleTypesService) {}

    @Get()
    findAll() {
       return this.vehicleTypesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') vehicleTypeId: number) {
        return await this.vehicleTypesService.findById(vehicleTypeId);
    }

    @Post()
    async create(@Body() newVehicleType: VehicleTypeDTO){
        return this.vehicleTypesService.create(newVehicleType);
    }

    @Put(':id')
    async replace(@Param('id') vehicleTypeId: number, @Body() newVehicleType: VehicleTypeDTO) {
        return this.vehicleTypesService.replace(vehicleTypeId, newVehicleType);
    }

    @Delete(':id')
    async delete(@Param('id') vehicleTypeId) {
       return this.vehicleTypesService.delete(vehicleTypeId);
    }
}
