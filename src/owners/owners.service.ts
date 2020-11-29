import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { OwnerDTO } from './owner.dto';

@Injectable()
export class OwnersService {
    constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

    async findAll() {
        const owners =  await this.ownersRepository.find();
        return owners;
    }

    async findById(ownerId: number) {
        const owners =  await this.ownersRepository.findByIds([ownerId]);
        return owners[0] ? owners[0] : owners;
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
