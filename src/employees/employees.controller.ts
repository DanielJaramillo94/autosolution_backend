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
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';
import { Logger } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('employees')
export class EmployeesController {
  private readonly logger = new Logger(EmployeesController.name);
  constructor(private employeesService: EmployeesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ManagementAssistant, Role.Supervisor, Role.Mechanic)
  async findAll() {
    const employees = await this.employeesService.query({ filter: {} });
    return employees.map(employee => {
      const { password, ...result } = employee;
      return result;
    });
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ManagementAssistant, Role.Supervisor, Role.Mechanic)
  async findByEmail(@Param('email') employeeEmail: string) {
    return await this.employeesService.findByEmail(employeeEmail);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async create(@Body() newEmployee: EmployeeDTO) {
    return this.employeesService.create(newEmployee);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant, Role.Supervisor, Role.Mechanic)
  async replace(
    @Param('id') employeeId: number,
    @Body() newEmployee: EmployeeDTO,
  ) {
    return this.employeesService.replace(employeeId, newEmployee);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ManagementAssistant)
  async delete(@Param('id') employeeId) {
    return this.employeesService.deleteOne(employeeId);
  }
}
