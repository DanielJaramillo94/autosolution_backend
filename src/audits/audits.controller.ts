import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { RolesService } from './audits.service';
import { RoleDTO } from './audit.dto';

@Controller('roles')
export class RolesController {
    constructor (private rolesService: RolesService) {}

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') roleId: number) {
        return await this.rolesService.findById(roleId);
    }

    @Post()
    async create(@Body() newRole: RoleDTO){
        return this.rolesService.create(newRole);
    }

    @Put(':id')
    async replace(@Param('id') roleId: number, @Body() newRole: RoleDTO) {
        return this.rolesService.replace(roleId, newRole);
    }

    @Delete(':id')
    async delete(@Param('id') roleId) {
        return this.rolesService.delete(roleId);
    }
}
