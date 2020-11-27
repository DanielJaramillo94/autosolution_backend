import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleState } from './vehicleState.entity';
import { VehicleStateDTO } from './vehicleState.dto';

@Injectable()
export class VehicleStatesService {
    constructor(@InjectRepository(VehicleState) private vehicleStatesRepository: Repository<VehicleState>) {}

    async findAll() {
        const vehicleStates =  await this.vehicleStatesRepository.find();
        return vehicleStates;
    }

    async findById(vehicleStateId: number) {
        const vehicleStates =  await this.vehicleStatesRepository.findByIds([vehicleStateId]);
        return vehicleStates[0] ? vehicleStates[0] : vehicleStates;
    }

    async create(newVehicleState: VehicleStateDTO) {
        return this.vehicleStatesRepository.save(newVehicleState);
    }

    async replace(vehicleStateId: number, newVehicleState: VehicleStateDTO) {
        return this.vehicleStatesRepository.update(vehicleStateId, newVehicleState);
    }

    async delete(vehicleStateId: number) {
        const vehicleState = await this.vehicleStatesRepository.findByIds([vehicleStateId])
        return this.vehicleStatesRepository.remove(vehicleState[0]);
    }
}
