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
import { VehiclesService } from './vehicles.service';
import { VehicleDTO } from './vehicle.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') vehicleId: number) {
    return await this.vehiclesService.findById(vehicleId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Mechanic)
  async create(@Body() newVehicle: VehicleDTO) {
    return this.vehiclesService.create(newVehicle);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Mechanic, Role.Supervisor)
  async replace(
    @Param('id') vehicleId: number,
    @Body() newVehicle: VehicleDTO,
  ) {
    return this.vehiclesService.replace(vehicleId, newVehicle);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.Mechanic)
  async delete(@Param('id') vehicleId) {
    return this.vehiclesService.delete(vehicleId);
  }
}
