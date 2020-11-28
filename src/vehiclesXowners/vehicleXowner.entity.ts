import { Owner } from 'src/owners/owner.entity';
import { Vehicle } from 'src/vehicles/vehicle.entity';
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('vehicleXowner')
export class VehicleXowner {
    @PrimaryGeneratedColumn()
    id: number;   

    @ManyToOne(() => Vehicle, vehicle => vehicle.vehicleXowners, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "vehicleId" })
    vehicle: Vehicle;

    @Column({ type: "int" })
    vehicleId: number;

    @ManyToOne(() => Owner, owner => owner.vehicleXowners, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "ownerId" })
    owner: Owner;

    @Column({ type: "int" })
    ownerId: number;
}