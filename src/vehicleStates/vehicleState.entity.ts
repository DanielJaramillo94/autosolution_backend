import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { State } from 'src/states/state.entity';
import { Employee } from 'src/employees/employee.entity';

@Entity('vehicleState')
export class VehicleState {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => State, state => state.vehicleStates, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: "stateId" })
    state: State;

    @Column({ type: "int" })
    stateId: number;

    @ManyToOne(() => Vehicle, vehicle => vehicle.vehicleStates, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: "vehicleId" })
    vehicle: Vehicle;

    @Column({ type: "int" })
    vehicleId: number;

    @ManyToOne(() => Employee, employee => employee.vehicleStates, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: "mechanicalId" })
    employee: Employee;

    @Column({ type: "int" })
    mechanicalId: number;
}