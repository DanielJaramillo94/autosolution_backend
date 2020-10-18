import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Ocurrencia } from 'src/ocurrencias/ocurrencia.entity';
import { Archivo } from 'src/archivos/archivo.entity';

@Entity('grabacion')
export class Grabacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        unique: true,
    })
    idexterno: string;

    @Column({
        length: 1024,
    })
    playurl: string;
    
    @Column({
        precision: 11,
        nullable: true,
    })
    duracion: number;
    
    @Column({
        length: 20,
        default: 'ZOOM',
    })
    estadodescarga: string;

    @ManyToOne(() => Ocurrencia, ocurrencia => ocurrencia.grabaciones, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "ocurrenciaId" })
    ocurrencia: Ocurrencia;

    @Column({ type: "int" })
    ocurrenciaId: number;

    @OneToMany(() => Archivo, archivo => archivo.grabacion, {onDelete: 'CASCADE'})
    archivos: Archivo[];
}