import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './audit.entity';
import { AuditDTO } from './audit.dto';

@Injectable()
export class AuditsService {
    constructor(@InjectRepository(Audit) private auditsRepository: Repository<Audit>) {}

    async findAll() {
        const audits =  await this.auditsRepository.find();
        return audits;
    }

    async findById(auditId: number) {
        const audits =  await this.auditsRepository.findByIds([auditId]);
        return audits[0] ? audits[0] : audits;
    }

    async create(newAudit: AuditDTO) {
        return this.auditsRepository.save(newAudit);
    }

    async replace(auditId: number, newAudit: AuditDTO) {
        return this.auditsRepository.update(auditId, newAudit);
    }

    async delete(auditId: number) {
        const audit = await this.auditsRepository.findByIds([auditId])
        return this.auditsRepository.remove(audit[0]);
    }
}
