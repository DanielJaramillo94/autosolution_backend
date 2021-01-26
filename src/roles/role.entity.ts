import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Employee } from 'src/employees/employee.entity';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;   

    @Column({
        length: 50,
    })
    name: string;

    @OneToMany(type => Employee, employee => employee.role) 
    employees: Employee[];
}