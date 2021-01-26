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
import { RolesService } from './roles.service';
import { RoleDTO } from './role.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant, Role.Supervisor, Role.Mechanic)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant, Role.Supervisor, Role.Mechanic)
  async findById(@Param('id') roleId: number) {
    return await this.rolesService.findById(roleId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async create(@Body() newRole: RoleDTO) {
    return this.rolesService.create(newRole);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async replace(@Param('id') roleId: number, @Body() newRole: RoleDTO) {
    return this.rolesService.replace(roleId, newRole);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async delete(@Param('id') roleId) {
    return this.rolesService.delete(roleId);
  }
}
