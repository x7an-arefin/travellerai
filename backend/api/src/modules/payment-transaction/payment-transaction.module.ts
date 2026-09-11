import { Module } from 'honestjs';
import { PaymentTransactionController } from './payment-transaction.controller.js';
import { PaymentTransactionService } from './payment-transaction.service.js';
import { PaymentTransactionRepository } from './payment-transaction.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the PaymentTransaction controller, service, and repository with the DI container
 */
@Module({
  controllers: [PaymentTransactionController],
  services: [PaymentTransactionService, PaymentTransactionRepository],
})
export class PaymentTransactionModule {}
