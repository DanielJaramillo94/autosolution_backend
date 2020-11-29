import { Controller, Get, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { AuditDTO } from './audit.dto';

@Controller('audits')
export class AuditsController {
    constructor (private auditsService: AuditsService) {}

    @Get()
    findAll() {
        return this.auditsService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') auditId: number) {
        return await this.auditsService.findById(auditId);
    }

    @Post()
    async create(@Body() newAudit: AuditDTO){
        return this.auditsService.create(newAudit);
    }

    @Put(':id')
    async replace(@Param('id') auditId: number, @Body() newAudit: AuditDTO) {
        return this.auditsService.replace(auditId, newAudit);
    }

    @Delete(':id')
    async delete(@Param('id') auditId) {
        return this.auditsService.delete(auditId);
    }
}
