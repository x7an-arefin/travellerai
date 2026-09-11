import { Module } from 'honestjs';
import { WithdrawalRequestController } from './withdrawal-request.controller.js';
import { WithdrawalRequestService } from './withdrawal-request.service.js';
import { WithdrawalRequestRepository } from './withdrawal-request.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the WithdrawalRequest controller, service, and repository with the DI container
 */
@Module({
  controllers: [WithdrawalRequestController],
  services: [WithdrawalRequestService, WithdrawalRequestRepository],
})
export class WithdrawalRequestModule {}
