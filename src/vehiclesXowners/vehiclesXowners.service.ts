import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleXowner } from './vehicleXowner.entity';
import { VehicleXownerDTO } from './vehicleXowner.dto';

@Injectable()
export class VehicleXownersService {
    constructor(@InjectRepository(VehicleXowner) private vehicleXownersRepository: Repository<VehicleXowner>) { }

    async findAll() {
        const vehicleXowners = await this.vehicleXownersRepository.find();
        return vehicleXowners;
    }

    async findById(vehicleXownerId: number) {
        const vehicleXowners = await this.vehicleXownersRepository.findByIds([vehicleXownerId]);
        return vehicleXowners[0] ? vehicleXowners[0] : vehicleXowners;
    }

    async findOwnerByVehicleId(vehicleId: number): Promise<any> {
        const owner = await this.vehicleXownersRepository.findOne({
            where: { vehicleId: vehicleId }, select: ["id"], relations: ["owner"]
        });
        return owner || null;
    }

    async create(newVehicleXowner: VehicleXownerDTO) {
        return this.vehicleXownersRepository.save(newVehicleXowner);
    }

    async replace(vehicleXownerId: number, newVehicleXowner: VehicleXownerDTO) {
        return this.vehicleXownersRepository.update(vehicleXownerId, newVehicleXowner);
    }

    async delete(vehicleXownerId: number) {
        const vehicleXowner = await this.vehicleXownersRepository.findByIds([vehicleXownerId])
        return this.vehicleXownersRepository.remove(vehicleXowner[0]);
    }
}
