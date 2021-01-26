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
import { VehicleTypesService } from './vehicleTypes.service';
import { VehicleTypeDTO } from './vehicleType.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('vehicleTypes')
export class VehicleTypesController {
  constructor(private vehicleTypesService: VehicleTypesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  findAll() {
    return this.vehicleTypesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  async findById(@Param('id') vehicleTypeId: number) {
    return await this.vehicleTypesService.findById(vehicleTypeId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  async create(@Body() newVehicleType: VehicleTypeDTO) {
    return this.vehicleTypesService.create(newVehicleType);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  async replace(
    @Param('id') vehicleTypeId: number,
    @Body() newVehicleType: VehicleTypeDTO,
  ) {
    return this.vehicleTypesService.replace(vehicleTypeId, newVehicleType);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  async delete(@Param('id') vehicleTypeId) {
    return this.vehicleTypesService.delete(vehicleTypeId);
  }
}
