import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Role } from 'src/roles/role.entity';


@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 50,
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

    @Column({
        nullable: true
    })
    removalDate: Date;

    @ManyToOne(() => Role, role => role.employees, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "roleId" })
    role: Role;

    @Column({ type: "int" })
    roleId: number;

}