import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Grabacion } from 'src/grabaciones/grabacion.entity';

@Entity('archivo')
export class Archivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        unique: true,
    })
    idexterno: string;

    @Column({
        length: 45,
    })
    formato: string;

    @Column({
        length: 1024,
    })
    url: string;
    
    @Column({
        type: 'bigint',
        precision: 20,
        unsigned: true,
        nullable: true,
        comment: 'En bytes'
    })
    pesobyte: number;

    @Column({
        length: 20,
        default: 'SIN DESCARGAR'
    })
    estadodescarga: string;

    @ManyToOne(() => Grabacion, grabacion => grabacion.archivos, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({ name: "grabacionId" })
    grabacion: Grabacion;

    @Column({ type: "int" })
    grabacionId: number;
}