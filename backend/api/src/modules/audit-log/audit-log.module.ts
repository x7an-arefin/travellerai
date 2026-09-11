import { Module } from 'honestjs';
import { AuditLogController } from './audit-log.controller.js';
import { AuditLogService } from './audit-log.service.js';
import { AuditLogRepository } from './audit-log.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the AuditLog controller, service, and repository with the DI container
 */
@Module({
  controllers: [AuditLogController],
  services: [AuditLogService, AuditLogRepository],
})
export class AuditLogModule {}
