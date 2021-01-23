import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { VehicleStatesService } from './vehicleStates.service';
import { VehicleStateDTO } from './vehicleState.dto';

@Controller('vehicleStates')
export class VehicleStatesController {
    constructor(private vehicleStatesService: VehicleStatesService) { }

    @Get()
    findAll() {
        return this.vehicleStatesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') vehicleStateId: number) {
        return await this.vehicleStatesService.findById(vehicleStateId);
    }

    @Get('mechanical/:mechanicalId')
    async findByMechanicalId(@Param('mechanicalId') mechanicalId: number) {
        return await this.vehicleStatesService.findByMechanicalId(mechanicalId);
    }

    @Get('vehicle/:vehicleId')
    async findByVehicleId(@Param('vehicleId') vehicleId: number) {
        return await this.vehicleStatesService.findByVehicleId(vehicleId);
    }

    @Post()
    async create(@Body() newVehicleState: VehicleStateDTO) {
        return this.vehicleStatesService.create(newVehicleState);
    }

    @Put(':id')
    async replace(@Param('id') vehicleStateId: number, @Body() newVehicleState: VehicleStateDTO) {
        return this.vehicleStatesService.replace(vehicleStateId, newVehicleState);
    }

    @Delete(':id')
    async delete(@Param('id') vehicleStateId) {
        return this.vehicleStatesService.delete(vehicleStateId);
    }
}
