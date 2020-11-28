import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, DeleteDateColumn, OneToMany} from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { VehicleState } from 'src/vehicleStates/vehicleState.entity';
import { Audit } from 'src/audits/audit.entity';

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 1024,
    })
    password: string;

    @Column({
        length: 100,
    })
    email: string;

    @Column({
        length: 100,
    })
    cellphone: string;

    @Column({
    })
    registryDate: Date;

    @DeleteDateColumn()
    removalDate: Date;

    @ManyToOne(() => Role, role => role.employees, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "roleId" })
    role: Role;

    @Column({ type: "int" })
    roleId: number;

    @OneToMany(type => VehicleState, vehicleState => vehicleState.employee) 
    vehicleStates: VehicleState[];

    @OneToMany(type => Audit, audit => audit.employee) 
    audits: Audit[];
}