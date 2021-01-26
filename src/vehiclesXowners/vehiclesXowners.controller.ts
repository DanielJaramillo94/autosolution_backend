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
import { VehicleXownersService } from './vehiclesXowners.service';
import { VehicleXownerDTO } from './vehicleXowner.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('vehicleXowners')
export class VehicleXownersController {
  constructor(private vehicleXownersService: VehicleXownersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  findAll() {
    return this.vehicleXownersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async findById(@Param('id') vehicleXownerId: number) {
    return await this.vehicleXownersService.findById(vehicleXownerId);
  }

  @Get('owner/:vehicleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  //   @Roles(Role.ManagementAssistant, Role.Supervisor)
  async findOwnerByVehicleId(@Param('vehicleId') vehicleId: number) {
    return await this.vehicleXownersService.findOwnerByVehicleId(vehicleId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Supervisor, Role.Mechanic)
  async create(@Body() newVehicleXowner: VehicleXownerDTO) {
    return this.vehicleXownersService.create(newVehicleXowner);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async replace(
    @Param('id') vehicleXownerId: number,
    @Body() newVehicleXowner: VehicleXownerDTO,
  ) {
    return this.vehicleXownersService.replace(
      vehicleXownerId,
      newVehicleXowner,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async delete(@Param('id') vehicleXownerId) {
    return this.vehicleXownersService.delete(vehicleXownerId);
  }
}
