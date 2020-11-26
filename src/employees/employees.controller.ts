import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';

@Controller('employees')
export class EmployeesController {
    constructor (private employeesService: EmployeesService) {}

    @Get()
    findAll() {
       return this.employeesService.query({filter:{}});
    }

    @Get(':id')
    async findByEmail(@Param('id') employeeEmail: string) {
        return await this.employeesService.findByEmail(employeeEmail);
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
       return this.employeesService.deleteOne(employeeId);
    }
}
