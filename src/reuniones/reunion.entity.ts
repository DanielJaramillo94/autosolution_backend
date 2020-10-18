import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Ocurrencia } from 'src/ocurrencias/ocurrencia.entity';

@Entity('reunionvideoconferencia')
export class Reunion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 45,
        unique: true,
    })
    uuid: string;

    @Column({
        length: 100,
        unique: true,
    })
    idsistemaexterno: string;

    @Column({
        length: 1024,
    })
    urljoin: string;

    @Column({
        length: 1024,
    })
    urlstart: string;

    @Column({
        length: 45,
    })
    hostid: string;

    @Column({
        unsigned: true,
        precision: 11,
    })
    createdate: number;

    @Column({
        length: 128,
    })
    nombre: string;

    @OneToMany(() => Ocurrencia, ocurrencia => ocurrencia.reunion, {onDelete: 'CASCADE'})
    ocurrencias: Ocurrencia[];

    static KEYS_BD = {
        "IDX_9458b45908ac37f3ae48728c50": "idsistemaexterno",
        "IDX_f46189dc008512b32f9b05486d": "uuid",
    }
}