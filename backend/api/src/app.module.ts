import { Module } from 'honestjs';

import { UserModule } from '@modules/user/user.module.js';

import { DestinationModule } from '@modules/destination/destination.module.js';

import { CategoryModule } from '@modules/category/category.module.js';

import { ProviderModule } from '@modules/provider/provider.module.js';

import { ProviderStaffModule } from '@modules/provider-staff/provider-staff.module.js';

import { KycDocumentModule } from '@modules/kyc-document/kyc-document.module.js';

import { ProviderPayoutAccountModule } from '@modules/provider-payout-account/provider-payout-account.module.js';

import { AmenityModule } from '@modules/amenity/amenity.module.js';

import { GuideProfileModule } from '@modules/guide-profile/guide-profile.module.js';

import { PackageModule } from '@modules/package/package.module.js';

import { ItineraryItemModule } from '@modules/itinerary-item/itinerary-item.module.js';

import { PackageFaqModule } from '@modules/package-faq/package-faq.module.js';

import { PackageAddonModule } from '@modules/package-addon/package-addon.module.js';

import { DepartureModule } from '@modules/departure/departure.module.js';

import { WaitlistModule } from '@modules/waitlist/waitlist.module.js';

import { PriceRuleModule } from '@modules/price-rule/price-rule.module.js';

import { ExchangeRateModule } from '@modules/exchange-rate/exchange-rate.module.js';

import { BookingModule } from '@modules/booking/booking.module.js';

import { BookingParticipantModule } from '@modules/booking-participant/booking-participant.module.js';

import { BookingAddonItemModule } from '@modules/booking-addon-item/booking-addon-item.module.js';

import { PaymentTransactionModule } from '@modules/payment-transaction/payment-transaction.module.js';

import { LedgerEntryModule } from '@modules/ledger-entry/ledger-entry.module.js';

import { ProviderWalletModule } from '@modules/provider-wallet/provider-wallet.module.js';

import { CustomerWalletModule } from '@modules/customer-wallet/customer-wallet.module.js';

import { WithdrawalRequestModule } from '@modules/withdrawal-request/withdrawal-request.module.js';

import { RefundRequestModule } from '@modules/refund-request/refund-request.module.js';

import { DisputeModule } from '@modules/dispute/dispute.module.js';

import { CouponModule } from '@modules/coupon/coupon.module.js';

import { GiftCardModule } from '@modules/gift-card/gift-card.module.js';

import { LoyaltyAccountModule } from '@modules/loyalty-account/loyalty-account.module.js';

import { AffiliateAccountModule } from '@modules/affiliate-account/affiliate-account.module.js';

import { ReviewModule } from '@modules/review/review.module.js';

import { ReviewResponseModule } from '@modules/review-response/review-response.module.js';

import { SupportTicketModule } from '@modules/support-ticket/support-ticket.module.js';

import { TicketMessageModule } from '@modules/ticket-message/ticket-message.module.js';

import { TripInquiryModule } from '@modules/trip-inquiry/trip-inquiry.module.js';

import { ProviderQuotationModule } from '@modules/provider-quotation/provider-quotation.module.js';

import { CmsPageModule } from '@modules/cms-page/cms-page.module.js';

import { BlogPostModule } from '@modules/blog-post/blog-post.module.js';

import { AuditLogModule } from '@modules/audit-log/audit-log.module.js';
import { HotelPropertyModule } from '@modules/hotel-property/hotel-property.module.js';
import { PropertyAmenityModule } from '@modules/property-amenity/property-amenity.module.js';
import { RoomTypeModule } from '@modules/room-type/room-type.module.js';
import { RoomUnitModule } from '@modules/room-unit/room-unit.module.js';
import { RatePlanModule } from '@modules/rate-plan/rate-plan.module.js';
import { InventoryCalendarModule } from '@modules/inventory-calendar/inventory-calendar.module.js';
import { HotelBookingModule } from '@modules/hotel-booking/hotel-booking.module.js';
import { HotelBookingRoomModule } from '@modules/hotel-booking-room/hotel-booking-room.module.js';
import { HotelGuestFolioModule } from '@modules/hotel-guest-folio/hotel-guest-folio.module.js';
import { HotelMaintenanceTicketModule } from '@modules/hotel-maintenance-ticket/hotel-maintenance-ticket.module.js';
import { HotelUpsellOfferModule } from '@modules/hotel-upsell-offer/hotel-upsell-offer.module.js';
import { HotelUpsellConversionModule } from '@modules/hotel-upsell-conversion/hotel-upsell-conversion.module.js';
import { HotelReviewModule } from '@modules/hotel-review/hotel-review.module.js';
import { VehicleModule } from '@modules/vehicle/vehicle.module.js';
import { VehicleComplianceDocModule } from '@modules/vehicle-compliance-doc/vehicle-compliance-doc.module.js';
import { VehiclePricingPlanModule } from '@modules/vehicle-pricing-plan/vehicle-pricing-plan.module.js';
import { VehicleTransferRouteModule } from '@modules/vehicle-transfer-route/vehicle-transfer-route.module.js';
import { VehicleProtectionPlanModule } from '@modules/vehicle-protection-plan/vehicle-protection-plan.module.js';
import { DriverModule } from '@modules/driver/driver.module.js';
import { VehicleBookingModule } from '@modules/vehicle-booking/vehicle-booking.module.js';
import { VehicleBookingExtraModule } from '@modules/vehicle-booking-extra/vehicle-booking-extra.module.js';
import { VehicleInspectionModule } from '@modules/vehicle-inspection/vehicle-inspection.module.js';
import { VehicleExtraChargeModule } from '@modules/vehicle-extra-charge/vehicle-extra-charge.module.js';
import { VehicleMaintenanceLogModule } from '@modules/vehicle-maintenance-log/vehicle-maintenance-log.module.js';
import { VehicleReviewModule } from '@modules/vehicle-review/vehicle-review.module.js';


/**
 * @author arefin
 * @description Root application module that imports all generated feature modules
 */
@Module({
  imports: [UserModule, DestinationModule, CategoryModule, ProviderModule, ProviderStaffModule, KycDocumentModule, ProviderPayoutAccountModule, AmenityModule, GuideProfileModule, PackageModule, ItineraryItemModule, PackageFaqModule, PackageAddonModule, DepartureModule, WaitlistModule, PriceRuleModule, ExchangeRateModule, BookingModule, BookingParticipantModule, BookingAddonItemModule, PaymentTransactionModule, LedgerEntryModule, ProviderWalletModule, CustomerWalletModule, WithdrawalRequestModule, RefundRequestModule, DisputeModule, CouponModule, GiftCardModule, LoyaltyAccountModule, AffiliateAccountModule, ReviewModule, ReviewResponseModule, SupportTicketModule, TicketMessageModule, TripInquiryModule, ProviderQuotationModule, CmsPageModule, BlogPostModule, AuditLogModule, HotelPropertyModule, PropertyAmenityModule, RoomTypeModule, RoomUnitModule, RatePlanModule, InventoryCalendarModule, HotelBookingModule, HotelBookingRoomModule, HotelGuestFolioModule, HotelMaintenanceTicketModule, HotelUpsellOfferModule, HotelUpsellConversionModule, HotelReviewModule, VehicleModule, VehicleComplianceDocModule, VehiclePricingPlanModule, VehicleTransferRouteModule, VehicleProtectionPlanModule, DriverModule, VehicleBookingModule, VehicleBookingExtraModule, VehicleInspectionModule, VehicleExtraChargeModule, VehicleMaintenanceLogModule, VehicleReviewModule],
})
export class AppModule {}
