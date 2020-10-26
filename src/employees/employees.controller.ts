import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';

@Controller('employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}

    @Get()
    findAll() {
        return this.employeesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') employeeId: number) {
        return await this.employeesService.findById(employeeId);
    }

    @Post()
    async create(@Body() newEmployee: EmployeeDTO){
        return this.employeesService.create(newEmployee);
    }

    @Put(':id')
    async replace(@Param('id') employeeId: number, @Body() newEmployee: EmployeeDTO) {
        return this.employeesService.replace(employeeId, newEmployee);
    }

    @Delete(':id')
    async delete(@Param('id') employeeId) {
        return this.employeesService.delete(employeeId);
    }
}
