import { QueryService } from '@nestjs-query/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeDTO } from './employee.dto';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Logger} from '@nestjs/common';

@QueryService(Employee)
export class EmployeesService extends TypeOrmQueryService<Employee> {
    private readonly logger = new Logger(EmployeesService.name)
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {
        super(employeesRepository, { useSoftDelete: true });
    }

/*     async findAll() {
        const employees =  await this.employeesRepository.find({select: ["id", "name", "password", "email", "cellphone", "registryDate", "removalDate"], relations: ["role"]});
        return employees; 
    } */

/*     async findByIdentifier(employeeId: number) {
        const employees =  await this.employeesRepository.findByIds([employeeId], {select: ["id", "name", "password", "email", "cellphone", "registryDate", "removalDate"], relations: ["role"]});
        return employees[0] ? employees[0] : employees;
    } */

    async findByEmail(employeeEmail: string): Promise<Employee> {
        const employee =  await this.employeesRepository.findOne({
            where: { email: employeeEmail }, select: ["id", "name", "password", "email", "cellphone", "registryDate", "removalDate"], relations: ["role"]
        });
        return employee || null;
    }

    async create(newEmployee: EmployeeDTO) {   
        return this.employeesRepository.save(newEmployee);
    }

    async replace(employeeId: number, newEmployee: EmployeeDTO) {
        return this.employeesRepository.update(employeeId, newEmployee);
    }
}
