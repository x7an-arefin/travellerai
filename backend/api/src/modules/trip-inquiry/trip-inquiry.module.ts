import { Module } from 'honestjs';
import { TripInquiryController } from './trip-inquiry.controller.js';
import { TripInquiryService } from './trip-inquiry.service.js';
import { TripInquiryRepository } from './trip-inquiry.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the TripInquiry controller, service, and repository with the DI container
 */
@Module({
  controllers: [TripInquiryController],
  services: [TripInquiryService, TripInquiryRepository],
})
export class TripInquiryModule {}
