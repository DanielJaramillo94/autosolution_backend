import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';
import { StateDTO } from './state.dto';

@Injectable()
export class StatesService {
    constructor(@InjectRepository(State) private statesRepository: Repository<State>) {}

    async findAll() {
        const states =  await this.statesRepository.find();
        return states;
    }

    async findById(stateId: number) {
        const states =  await this.statesRepository.findByIds([stateId]);
        return states[0] ? states[0] : states;
    }

    async create(newState: StateDTO) {
        return this.statesRepository.save(newState);
    }

    async replace(stateId: number, newState: StateDTO) {
        return this.statesRepository.update(stateId, newState);
    }

    async delete(stateId: number) {
        const state = await this.statesRepository.findByIds([stateId])
        return this.statesRepository.remove(state[0]);
    }
}
