import type { Env } from '@generated/bindings.js';
import type { EventEnvelope } from '@core/events/event-envelope.js';
import { logger } from '@core/observability/logger.js';

type EventHandler = (envelope: EventEnvelope, env: Env, ctx: ExecutionContext) => Promise<void>;




/**
 * @author arefin
 * @description Handle traveller.user.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleUserCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_user_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.user.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleUserUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_user_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.user.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleUserDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_user_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.destination.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleDestinationCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_destination_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.destination.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleDestinationUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_destination_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.destination.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleDestinationDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_destination_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.category.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleCategoryCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_category_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.category.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleCategoryUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_category_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.category.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleCategoryDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_category_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.provider.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.provider.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.provider.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.provider-staff.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderStaffCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-staff_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.provider-staff.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderStaffUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-staff_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.provider-staff.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderStaffDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-staff_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.kyc-document.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleKycDocumentCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_kyc-document_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.kyc-document.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleKycDocumentUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_kyc-document_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.kyc-document.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleKycDocumentDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_kyc-document_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.provider-payout-account.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderPayoutAccountCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-payout-account_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.provider-payout-account.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderPayoutAccountUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-payout-account_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.provider-payout-account.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderPayoutAccountDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-payout-account_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.amenity.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleAmenityCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_amenity_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.amenity.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleAmenityUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_amenity_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.amenity.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleAmenityDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_amenity_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.guide-profile.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleGuideProfileCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_guide-profile_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.guide-profile.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleGuideProfileUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_guide-profile_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.guide-profile.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleGuideProfileDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_guide-profile_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.package.created.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.package.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.package.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.itinerary-item.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleItineraryItemCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_itinerary-item_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.itinerary-item.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleItineraryItemUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_itinerary-item_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.itinerary-item.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleItineraryItemDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_itinerary-item_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.package-faq.created.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageFaqCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-faq_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.package-faq.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageFaqUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-faq_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.package-faq.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageFaqDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-faq_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.package-addon.created.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageAddonCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-addon_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.package-addon.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageAddonUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-addon_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.package-addon.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handlePackageAddonDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_package-addon_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.departure.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleDepartureCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_departure_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.departure.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleDepartureUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_departure_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.departure.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleDepartureDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_departure_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.waitlist.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleWaitlistCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_waitlist_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.waitlist.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleWaitlistUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_waitlist_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.waitlist.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleWaitlistDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_waitlist_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.price-rule.created.v1 domain events — extend with downstream side-effect logic
 */
async function handlePriceRuleCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_price-rule_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.price-rule.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handlePriceRuleUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_price-rule_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.price-rule.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handlePriceRuleDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_price-rule_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.exchange-rate.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleExchangeRateCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_exchange-rate_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.exchange-rate.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleExchangeRateUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_exchange-rate_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.exchange-rate.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleExchangeRateDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_exchange-rate_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.booking.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.booking.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.booking.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.booking-participant.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingParticipantCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-participant_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.booking-participant.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingParticipantUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-participant_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.booking-participant.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingParticipantDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-participant_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.booking-addon-item.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingAddonItemCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-addon-item_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.booking-addon-item.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingAddonItemUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-addon-item_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.booking-addon-item.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleBookingAddonItemDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_booking-addon-item_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.payment-transaction.created.v1 domain events — extend with downstream side-effect logic
 */
async function handlePaymentTransactionCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_payment-transaction_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.payment-transaction.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handlePaymentTransactionUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_payment-transaction_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.payment-transaction.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handlePaymentTransactionDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_payment-transaction_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.ledger-entry.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleLedgerEntryCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_ledger-entry_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}










/**
 * @author arefin
 * @description Handle traveller.provider-wallet.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderWalletCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-wallet_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.provider-wallet.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderWalletUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-wallet_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.customer-wallet.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleCustomerWalletCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_customer-wallet_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.customer-wallet.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleCustomerWalletUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_customer-wallet_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.withdrawal-request.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleWithdrawalRequestCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_withdrawal-request_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.withdrawal-request.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleWithdrawalRequestUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_withdrawal-request_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.withdrawal-request.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleWithdrawalRequestDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_withdrawal-request_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.refund-request.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleRefundRequestCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_refund-request_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.refund-request.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleRefundRequestUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_refund-request_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.refund-request.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleRefundRequestDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_refund-request_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.dispute.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleDisputeCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_dispute_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.dispute.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleDisputeUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_dispute_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.dispute.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleDisputeDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_dispute_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.coupon.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleCouponCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_coupon_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.coupon.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleCouponUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_coupon_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.coupon.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleCouponDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_coupon_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.gift-card.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleGiftCardCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_gift-card_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.gift-card.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleGiftCardUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_gift-card_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.gift-card.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleGiftCardDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_gift-card_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.loyalty-account.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleLoyaltyAccountCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_loyalty-account_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.loyalty-account.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleLoyaltyAccountUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_loyalty-account_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.affiliate-account.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleAffiliateAccountCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_affiliate-account_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.affiliate-account.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleAffiliateAccountUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_affiliate-account_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.affiliate-account.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleAffiliateAccountDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_affiliate-account_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.review.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.review.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.review.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.review-response.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewResponseCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review-response_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.review-response.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewResponseUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review-response_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.review-response.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleReviewResponseDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_review-response_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.support-ticket.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleSupportTicketCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_support-ticket_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.support-ticket.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleSupportTicketUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_support-ticket_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.support-ticket.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleSupportTicketDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_support-ticket_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.ticket-message.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleTicketMessageCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_ticket-message_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.ticket-message.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleTicketMessageUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_ticket-message_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.ticket-message.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleTicketMessageDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_ticket-message_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.trip-inquiry.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleTripInquiryCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_trip-inquiry_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.trip-inquiry.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleTripInquiryUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_trip-inquiry_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.trip-inquiry.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleTripInquiryDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_trip-inquiry_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.provider-quotation.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderQuotationCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-quotation_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.provider-quotation.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderQuotationUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-quotation_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.provider-quotation.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleProviderQuotationDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_provider-quotation_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.cms-page.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleCmsPageCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_cms-page_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.cms-page.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleCmsPageUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_cms-page_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.cms-page.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleCmsPageDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_cms-page_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.blog-post.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleBlogPostCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_blog-post_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}








/**
 * @author arefin
 * @description Handle traveller.blog-post.updated.v1 domain events — extend with downstream side-effect logic
 */
async function handleBlogPostUpdated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_blog-post_updated',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}




/**
 * @author arefin
 * @description Handle traveller.blog-post.deleted.v1 domain events — extend with downstream side-effect logic
 */
async function handleBlogPostDeleted(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_blog-post_deleted',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}






/**
 * @author arefin
 * @description Handle traveller.audit-log.created.v1 domain events — extend with downstream side-effect logic
 */
async function handleAuditLogCreated(envelope: EventEnvelope, env: Env, _ctx: ExecutionContext): Promise<void> {
  logger.info({
    action: 'handle_audit-log_created',
    eventId: envelope.eventId,
    subjectId: envelope.subject?.id,
  });
}









const EVENT_HANDLERS: Record<string, EventHandler> = {



  'traveller.user.created.v1': handleUserCreated,







  'traveller.user.updated.v1': handleUserUpdated,



  'traveller.user.deleted.v1': handleUserDeleted,





  'traveller.destination.created.v1': handleDestinationCreated,







  'traveller.destination.updated.v1': handleDestinationUpdated,



  'traveller.destination.deleted.v1': handleDestinationDeleted,





  'traveller.category.created.v1': handleCategoryCreated,







  'traveller.category.updated.v1': handleCategoryUpdated,



  'traveller.category.deleted.v1': handleCategoryDeleted,





  'traveller.provider.created.v1': handleProviderCreated,







  'traveller.provider.updated.v1': handleProviderUpdated,



  'traveller.provider.deleted.v1': handleProviderDeleted,





  'traveller.provider-staff.created.v1': handleProviderStaffCreated,







  'traveller.provider-staff.updated.v1': handleProviderStaffUpdated,



  'traveller.provider-staff.deleted.v1': handleProviderStaffDeleted,





  'traveller.kyc-document.created.v1': handleKycDocumentCreated,







  'traveller.kyc-document.updated.v1': handleKycDocumentUpdated,



  'traveller.kyc-document.deleted.v1': handleKycDocumentDeleted,





  'traveller.provider-payout-account.created.v1': handleProviderPayoutAccountCreated,







  'traveller.provider-payout-account.updated.v1': handleProviderPayoutAccountUpdated,



  'traveller.provider-payout-account.deleted.v1': handleProviderPayoutAccountDeleted,





  'traveller.amenity.created.v1': handleAmenityCreated,







  'traveller.amenity.updated.v1': handleAmenityUpdated,



  'traveller.amenity.deleted.v1': handleAmenityDeleted,





  'traveller.guide-profile.created.v1': handleGuideProfileCreated,







  'traveller.guide-profile.updated.v1': handleGuideProfileUpdated,



  'traveller.guide-profile.deleted.v1': handleGuideProfileDeleted,





  'traveller.package.created.v1': handlePackageCreated,







  'traveller.package.updated.v1': handlePackageUpdated,



  'traveller.package.deleted.v1': handlePackageDeleted,





  'traveller.itinerary-item.created.v1': handleItineraryItemCreated,







  'traveller.itinerary-item.updated.v1': handleItineraryItemUpdated,



  'traveller.itinerary-item.deleted.v1': handleItineraryItemDeleted,





  'traveller.package-faq.created.v1': handlePackageFaqCreated,







  'traveller.package-faq.updated.v1': handlePackageFaqUpdated,



  'traveller.package-faq.deleted.v1': handlePackageFaqDeleted,





  'traveller.package-addon.created.v1': handlePackageAddonCreated,







  'traveller.package-addon.updated.v1': handlePackageAddonUpdated,



  'traveller.package-addon.deleted.v1': handlePackageAddonDeleted,





  'traveller.departure.created.v1': handleDepartureCreated,







  'traveller.departure.updated.v1': handleDepartureUpdated,



  'traveller.departure.deleted.v1': handleDepartureDeleted,





  'traveller.waitlist.created.v1': handleWaitlistCreated,







  'traveller.waitlist.updated.v1': handleWaitlistUpdated,



  'traveller.waitlist.deleted.v1': handleWaitlistDeleted,





  'traveller.price-rule.created.v1': handlePriceRuleCreated,







  'traveller.price-rule.updated.v1': handlePriceRuleUpdated,



  'traveller.price-rule.deleted.v1': handlePriceRuleDeleted,





  'traveller.exchange-rate.created.v1': handleExchangeRateCreated,







  'traveller.exchange-rate.updated.v1': handleExchangeRateUpdated,



  'traveller.exchange-rate.deleted.v1': handleExchangeRateDeleted,





  'traveller.booking.created.v1': handleBookingCreated,







  'traveller.booking.updated.v1': handleBookingUpdated,



  'traveller.booking.deleted.v1': handleBookingDeleted,





  'traveller.booking-participant.created.v1': handleBookingParticipantCreated,







  'traveller.booking-participant.updated.v1': handleBookingParticipantUpdated,



  'traveller.booking-participant.deleted.v1': handleBookingParticipantDeleted,





  'traveller.booking-addon-item.created.v1': handleBookingAddonItemCreated,







  'traveller.booking-addon-item.updated.v1': handleBookingAddonItemUpdated,



  'traveller.booking-addon-item.deleted.v1': handleBookingAddonItemDeleted,





  'traveller.payment-transaction.created.v1': handlePaymentTransactionCreated,







  'traveller.payment-transaction.updated.v1': handlePaymentTransactionUpdated,



  'traveller.payment-transaction.deleted.v1': handlePaymentTransactionDeleted,





  'traveller.ledger-entry.created.v1': handleLedgerEntryCreated,









  'traveller.provider-wallet.created.v1': handleProviderWalletCreated,







  'traveller.provider-wallet.updated.v1': handleProviderWalletUpdated,





  'traveller.customer-wallet.created.v1': handleCustomerWalletCreated,







  'traveller.customer-wallet.updated.v1': handleCustomerWalletUpdated,





  'traveller.withdrawal-request.created.v1': handleWithdrawalRequestCreated,







  'traveller.withdrawal-request.updated.v1': handleWithdrawalRequestUpdated,



  'traveller.withdrawal-request.deleted.v1': handleWithdrawalRequestDeleted,





  'traveller.refund-request.created.v1': handleRefundRequestCreated,







  'traveller.refund-request.updated.v1': handleRefundRequestUpdated,



  'traveller.refund-request.deleted.v1': handleRefundRequestDeleted,





  'traveller.dispute.created.v1': handleDisputeCreated,







  'traveller.dispute.updated.v1': handleDisputeUpdated,



  'traveller.dispute.deleted.v1': handleDisputeDeleted,





  'traveller.coupon.created.v1': handleCouponCreated,







  'traveller.coupon.updated.v1': handleCouponUpdated,



  'traveller.coupon.deleted.v1': handleCouponDeleted,





  'traveller.gift-card.created.v1': handleGiftCardCreated,







  'traveller.gift-card.updated.v1': handleGiftCardUpdated,



  'traveller.gift-card.deleted.v1': handleGiftCardDeleted,





  'traveller.loyalty-account.created.v1': handleLoyaltyAccountCreated,







  'traveller.loyalty-account.updated.v1': handleLoyaltyAccountUpdated,





  'traveller.affiliate-account.created.v1': handleAffiliateAccountCreated,







  'traveller.affiliate-account.updated.v1': handleAffiliateAccountUpdated,



  'traveller.affiliate-account.deleted.v1': handleAffiliateAccountDeleted,





  'traveller.review.created.v1': handleReviewCreated,







  'traveller.review.updated.v1': handleReviewUpdated,



  'traveller.review.deleted.v1': handleReviewDeleted,





  'traveller.review-response.created.v1': handleReviewResponseCreated,







  'traveller.review-response.updated.v1': handleReviewResponseUpdated,



  'traveller.review-response.deleted.v1': handleReviewResponseDeleted,





  'traveller.support-ticket.created.v1': handleSupportTicketCreated,







  'traveller.support-ticket.updated.v1': handleSupportTicketUpdated,



  'traveller.support-ticket.deleted.v1': handleSupportTicketDeleted,





  'traveller.ticket-message.created.v1': handleTicketMessageCreated,







  'traveller.ticket-message.updated.v1': handleTicketMessageUpdated,



  'traveller.ticket-message.deleted.v1': handleTicketMessageDeleted,





  'traveller.trip-inquiry.created.v1': handleTripInquiryCreated,







  'traveller.trip-inquiry.updated.v1': handleTripInquiryUpdated,



  'traveller.trip-inquiry.deleted.v1': handleTripInquiryDeleted,





  'traveller.provider-quotation.created.v1': handleProviderQuotationCreated,







  'traveller.provider-quotation.updated.v1': handleProviderQuotationUpdated,



  'traveller.provider-quotation.deleted.v1': handleProviderQuotationDeleted,





  'traveller.cms-page.created.v1': handleCmsPageCreated,







  'traveller.cms-page.updated.v1': handleCmsPageUpdated,



  'traveller.cms-page.deleted.v1': handleCmsPageDeleted,





  'traveller.blog-post.created.v1': handleBlogPostCreated,







  'traveller.blog-post.updated.v1': handleBlogPostUpdated,



  'traveller.blog-post.deleted.v1': handleBlogPostDeleted,





  'traveller.audit-log.created.v1': handleAuditLogCreated,







};

/**
 * @author arefin
 * @description Consume and route domain events from the queue — implements idempotency checking and individual message acknowledgement
 */
export async function domainEventConsumer(
  batch: MessageBatch<EventEnvelope>,
  env: Env,
  ctx: ExecutionContext
): Promise<void> {
  const processedIds = new Set<string>();

  for (const message of batch.messages) {
    const envelope = message.body;
    const { eventId, eventName } = envelope;

    try {
      if (processedIds.has(eventId)) {
        logger.warn({ action: 'event_duplicate_skipped', eventId, eventName });
        message.ack();
        continue;
      }

      logger.info({
        action: 'event_processing',
        eventId,
        eventName,
        correlationId: envelope.correlationId,
        subjectId: envelope.subject?.id,
      });

      const handler = EVENT_HANDLERS[eventName];
      if (handler) {
        await handler(envelope, env, ctx);
      } else {
        logger.warn({ action: 'event_no_handler', eventName });
      }

      processedIds.add(eventId);
      message.ack();

      logger.info({ action: 'event_processed', eventId, eventName });
    } catch (err) {
      logger.error({
        action: 'event_processing_failed',
        eventId,
        eventName,
        error: String(err),
      });
      message.retry();
    }
  }
}
