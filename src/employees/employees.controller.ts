import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDTO } from './employee.dto';
import { Logger} from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
    private readonly logger = new Logger(EmployeesController.name)
    constructor (private employeesService: EmployeesService) {}

    @Get()
    findAll() {
       return this.employeesService.query({filter:{}});
    }

    @Get(':email')
    async findByEmail(@Param('email') employeeEmail: string) {
        return await this.employeesService.findByEmail(employeeEmail);
    }

/*     @Get(':id')
    async findByIdentifier(@Param('id') employeeId: number) {
        return await this.employeesService.findByIdentifier(employeeId);
    } */

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
