import { Vehicle } from 'src/vehicles/vehicle.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('vehicleType')
export class VehicleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
    })
    name: string;

    @OneToMany(type => Vehicle, vehicle => vehicle.vehicleType) 
    vehicles: Vehicle[];

}