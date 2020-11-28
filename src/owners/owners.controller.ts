import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnerDTO } from './owner.dto';

@Controller('owners')
export class OwnersController {
    constructor (private ownersService: OwnersService) {}

    @Get()
    findAll() {
        return this.ownersService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') ownerId: number) {
        return await this.ownersService.findById(ownerId);
    }

    @Post()
    async create(@Body() newOwner: OwnerDTO){
        return this.ownersService.create(newOwner);
    }

    @Put(':id')
    async replace(@Param('id') ownerId: number, @Body() newOwner: OwnerDTO) {
        return this.ownersService.replace(ownerId, newOwner);
    }

    @Delete(':id')
    async delete(@Param('id') ownerId) {
        return this.ownersService.delete(ownerId);
    }
}
