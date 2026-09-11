import { Module } from 'honestjs';
import { CouponController } from './coupon.controller.js';
import { CouponService } from './coupon.service.js';
import { CouponRepository } from './coupon.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Coupon controller, service, and repository with the DI container
 */
@Module({
  controllers: [CouponController],
  services: [CouponService, CouponRepository],
})
export class CouponModule {}
