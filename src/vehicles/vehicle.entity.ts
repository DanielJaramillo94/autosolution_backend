import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { VehicleType } from 'src/vehicleTypes/vehicleType.entity';
import { State } from 'src/states/state.entity';
import { VehicleState } from 'src/vehicleStates/vehicleState.entity';

@Entity('vehicle')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    plate: string;

    @Column({
        length: 50,
    })
    brand: string;

    @Column({
        length: 50,
    })
    model: string;

    @Column({
        length: 50,
    })
    color: string;

    @ManyToOne(() => VehicleType, vehicleType => vehicleType.vehicles, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "vehicleTypeId" })
    vehicleType: VehicleType;

    @Column({ type: "int" })
    vehicleTypeId: number;

    @ManyToOne(() => State, state => state.vehicles, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "stateId" })
    state: State;

    @Column({ type: "int" })
    stateId: number;

    @OneToMany(type => VehicleState, vehicleState => vehicleState.vehicle) 
    vehicleStates: VehicleState[];
}