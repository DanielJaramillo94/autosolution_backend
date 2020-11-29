import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicle) private vehiclesRepository: Repository<Vehicle>) {}

    async findAll() {
        const vehicles =  await this.vehiclesRepository.find({select: ["id", "plate", "brand", "model", "color"], relations: ["vehicleType", "state"] });
        return vehicles;
    }

    async findById(vehicleId: number) {
        const vehicles =  await this.vehiclesRepository.findByIds([vehicleId], {select: ["id", "plate", "brand", "model", "color"], relations: ["vehicleType", "state"] });
        return vehicles[0] ? vehicles[0] : vehicles;
    }

    async create(newVehicle: VehicleDTO) {
        return this.vehiclesRepository.save(newVehicle);
    }

    async replace(vehicleId: number, newVehicle: VehicleDTO) {
        return this.vehiclesRepository.update(vehicleId, newVehicle);
    }

    async delete(vehicleId: number) {
        const vehicle = await this.vehiclesRepository.findByIds([vehicleId])
        return this.vehiclesRepository.remove(vehicle[0]);
    }
}
