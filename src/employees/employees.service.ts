import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { EmployeeDTO } from './employee.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(Employee) private employeesRepository: Repository<Employee>) {}

    async findAll() {
        const employees =  await this.employeesRepository.find();
        return employees;
    }

    async findById(employeeId: number) {
        const employees =  await this.employeesRepository.findByIds([employeeId]);
        return employees[0] ? employees[0] : employees;
    }

    async findByEmail(employeeEmail: string): Promise<Employee> {
        const employee =  await this.employeesRepository.findOne({
            where: { email: employeeEmail }
        });
        return employee || null;
    }

    async create(newEmployee: EmployeeDTO) {
        const hash = hashSync(newEmployee.password, 10);
        newEmployee.password = hash;
        return this.employeesRepository.save(newEmployee);
    }

    async replace(employeeId: number, newEmployee: EmployeeDTO) {
        return this.employeesRepository.update(employeeId, newEmployee);
    }

    async delete(employeeId: number) {
        const employee = await this.employeesRepository.findByIds([employeeId])
        return this.employeesRepository.remove(employee[0]);
    }
}
