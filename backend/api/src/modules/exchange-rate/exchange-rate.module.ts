import { Module } from 'honestjs';
import { ExchangeRateController } from './exchange-rate.controller.js';
import { ExchangeRateService } from './exchange-rate.service.js';
import { ExchangeRateRepository } from './exchange-rate.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the ExchangeRate controller, service, and repository with the DI container
 */
@Module({
  controllers: [ExchangeRateController],
  services: [ExchangeRateService, ExchangeRateRepository],
})
export class ExchangeRateModule {}
