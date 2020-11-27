import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './audit.entity';
import { RoleDTO } from './audit.dto';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {}

    async findAll() {
        const roles =  await this.rolesRepository.find();
        return roles;
    }

    async findById(roleId: number) {
        const roles =  await this.rolesRepository.findByIds([roleId]);
        return roles[0] ? roles[0] : roles;
    }

    async create(newRole: RoleDTO) {
        return this.rolesRepository.save(newRole);
    }

    async replace(roleId: number, newRole: RoleDTO) {
        return this.rolesRepository.update(roleId, newRole);
    }

    async delete(roleId: number) {
        const role = await this.rolesRepository.findByIds([roleId])
        return this.rolesRepository.remove(role[0]);
    }
}
