import { Controller, Get, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { AuditDTO } from './audit.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('audits')
export class AuditsController {
    constructor (private auditsService: AuditsService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    findAll() {
        return this.auditsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async findById(@Param('id') auditId: number) {
        return await this.auditsService.findById(auditId);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async create(@Body() newAudit: AuditDTO){
        return this.auditsService.create(newAudit);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async replace(@Param('id') auditId: number, @Body() newAudit: AuditDTO) {
        return this.auditsService.replace(auditId, newAudit);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ManagementAssistant)
    async delete(@Param('id') auditId) {
        return this.auditsService.delete(auditId);
    }
}
