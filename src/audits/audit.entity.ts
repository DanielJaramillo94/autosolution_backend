import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Employee } from 'src/employees/employee.entity';
import { Owner } from 'src/owners/owner.entity';

@Entity('audit')
export class Audit {
    @PrimaryGeneratedColumn()
    id: number;  
    
    @Column({
    })
    date: Date; 

    @Column({
        length: 300,
    })
    description: string;

    @ManyToOne(() => Owner, owner => owner.audits, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "ownerId" })
    owner: Owner;

    @Column({ type: "int" })
    ownerId: number;

    @ManyToOne(() => Employee, employee => employee.audits, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "employeeId" })
    employee: Employee;

    @Column({ type: "int" })
    employeeId: number;
}