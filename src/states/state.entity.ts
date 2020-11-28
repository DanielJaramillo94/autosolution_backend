import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import { VehicleState } from 'src/vehicleStates/vehicleState.entity';

@Entity('state')
export class State {
    @PrimaryGeneratedColumn()
    id: number;   

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        length: 300,
    })
    description: string;

    @OneToMany(type => VehicleState, vehicleState => vehicleState.state) 
    vehicleStates: VehicleState[];
    
    @OneToMany(type => Vehicle, vehicle => vehicle.state) 
    vehicles: Vehicle[];
}