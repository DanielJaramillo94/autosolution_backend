import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VehicleStatesService } from './vehicleStates.service';
import { VehicleStateDTO } from './vehicleState.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('vehicleStates')
export class VehicleStatesController {
  constructor(private vehicleStatesService: VehicleStatesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.vehicleStatesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor)
  async create(@Body() newVehicleState: VehicleStateDTO) {
    return this.vehicleStatesService.create(newVehicleState);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Mechanic)
  async replace(
    @Param('id') vehicleStateId: number,
    @Body() newVehicleState: VehicleStateDTO,
  ) {
    return this.vehicleStatesService.replace(vehicleStateId, newVehicleState);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Mechanic)
  async delete(@Param('id') vehicleStateId) {
    return this.vehicleStatesService.delete(vehicleStateId);
  }
}
