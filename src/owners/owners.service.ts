import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { OwnerDTO } from './owner.dto';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { QueryService } from '@nestjs-query/core';
import { Logger} from '@nestjs/common';

@QueryService(Owner)
export class OwnersService extends TypeOrmQueryService<Owner> {
    private readonly logger = new Logger(OwnersService.name)

    constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {
        super(ownersRepository, { useSoftDelete: true });
    }

    async findAll() {
        const owners =  await this.ownersRepository.find();
        return owners;
    }

    async findByIdentifier(ownerId: number) {
        const owner =  await this.ownersRepository.findOne({
            where: { id: ownerId }, select: ["id", "name", "cellphone", "email" ], relations: ["vehicleXowners"]});
        return owner || null;
    }

    async findByEmail(ownerEmail: string): Promise<Owner> {
        const owner =  await this.ownersRepository.findOne({
            where: { email: ownerEmail }, select: ["id", "name", "cellphone", "email"]
        });
        return owner || null;
    }

    async create(newOwner: OwnerDTO) {
        return this.ownersRepository.save(newOwner);
    }

    async replace(ownerId: number, newOwner: OwnerDTO) {
        return this.ownersRepository.update(ownerId, newOwner);
    }

    async delete(ownerId: number) {
        const owner = await this.ownersRepository.findByIds([ownerId])
        return this.ownersRepository.remove(owner[0]);
    }
}
