import { Module } from 'honestjs';
import { PriceRuleController } from './price-rule.controller.js';
import { PriceRuleService } from './price-rule.service.js';
import { PriceRuleRepository } from './price-rule.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the PriceRule controller, service, and repository with the DI container
 */
@Module({
  controllers: [PriceRuleController],
  services: [PriceRuleService, PriceRuleRepository],
})
export class PriceRuleModule {}
