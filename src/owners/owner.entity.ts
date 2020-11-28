import { Audit } from 'src/audits/audit.entity';
import { VehicleXowner } from 'src/vehiclesXowners/vehicleXowner.entity';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('owner')
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;   

    @Column({
        length: 50,
    })
    name: string;

    @Column({
        length: 50,
    })
    cellphone: string;

    @Column({
        length: 50,
    })
    email: string;

    @Column({
    })
    tokenDate: Date;

    @OneToMany(type => Audit, audit => audit.owner) 
    audits: Audit[];

    @OneToMany(type => VehicleXowner, vehicleXowner => vehicleXowner.owner) 
    vehicleXowners: VehicleXowner[];
}