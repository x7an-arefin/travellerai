import { Module } from 'honestjs';
import { RefundRequestController } from './refund-request.controller.js';
import { RefundRequestService } from './refund-request.service.js';
import { RefundRequestRepository } from './refund-request.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the RefundRequest controller, service, and repository with the DI container
 */
@Module({
  controllers: [RefundRequestController],
  services: [RefundRequestService, RefundRequestRepository],
})
export class RefundRequestModule {}
