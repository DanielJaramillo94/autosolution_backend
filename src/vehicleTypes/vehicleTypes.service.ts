import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from './vehicleType.entity';
import { VehicleTypeDTO } from './vehicleType.dto';

@Injectable()
export class VehicleTypesService {
    constructor(@InjectRepository(VehicleType) private vehicleTypesRepository: Repository<VehicleType>) {}

    async findAll() {
        const vehicleTypes =  await this.vehicleTypesRepository.find();
        return vehicleTypes;
    }

    async findById(vehicleTypeId: number) {
        const vehicleTypes =  await this.vehicleTypesRepository.findByIds([vehicleTypeId]);
        return vehicleTypes[0] ? vehicleTypes[0] : vehicleTypes;
    }

    async create(newVehicleType: VehicleTypeDTO) {
        return this.vehicleTypesRepository.save(newVehicleType);
    }

    async replace(vehicleTypeId: number, newVehicleType: VehicleTypeDTO) {
        return this.vehicleTypesRepository.update(vehicleTypeId, newVehicleType);
    }

    async delete(vehicleTypeId: number) {
        const vehicleType = await this.vehicleTypesRepository.findByIds([vehicleTypeId])
        return this.vehicleTypesRepository.remove(vehicleType[0]);
    }
}
