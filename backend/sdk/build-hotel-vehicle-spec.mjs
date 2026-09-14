import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function makeCrud(entityName, selectFields, primaryKey = 'id') {
  return {
    create: {
      enabled: true,
      auth: true,
      permissions: [`${entityName.toLowerCase()}:create`],
      select: selectFields,
    },
    get: {
      enabled: true,
      auth: false,
      select: selectFields,
    },
    list: {
      enabled: true,
      auth: false,
      pagination: { type: 'cursor', defaultLimit: 20, maximumLimit: 100 },
      select: selectFields,
    },
    update: {
      enabled: true,
      auth: true,
      permissions: [`${entityName.toLowerCase()}:update`],
      select: selectFields,
    },
    delete: {
      enabled: true,
      auth: true,
      permissions: [`${entityName.toLowerCase()}:delete`],
      mode: 'soft',
    },
  };
}

const entities = {
  // -------------------------------------------------------------
  // 1. HotelProperty
  // -------------------------------------------------------------
  HotelProperty: {
    table: 'hotel_properties',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      providerId: { type: 'uuid', required: true, references: { entity: 'Provider', field: 'id' } },
      destinationId: { type: 'uuid', references: { entity: 'Destination', field: 'id' } },
      name: { type: 'string', required: true, maxLength: 200 },
      slug: { type: 'string', required: true, unique: true, maxLength: 250 },
      propertyType: {
        type: 'enum',
        values: ['hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping'],
        default: 'hotel',
      },
      starRating: { type: 'integer', default: 3 },
      checkInTime: { type: 'string', default: '14:00', maxLength: 10 },
      checkOutTime: { type: 'string', default: '11:00', maxLength: 10 },
      address: { type: 'string', required: true, maxLength: 500 },
      city: { type: 'string', required: true, maxLength: 100 },
      country: { type: 'string', required: true, maxLength: 100 },
      postalCode: { type: 'string', maxLength: 20 },
      latitude: { type: 'decimal', precision: 10, scale: 7 },
      longitude: { type: 'decimal', precision: 10, scale: 7 },
      phone: { type: 'string', maxLength: 30 },
      email: { type: 'string', maxLength: 255 },
      description: { type: 'text' },
      coverImageUrl: { type: 'string', maxLength: 500 },
      galleryUrls: { type: 'json' },
      taxId: { type: 'string', maxLength: 100 },
      businessRegistrationNumber: { type: 'string', maxLength: 100 },
      status: {
        type: 'enum',
        values: ['draft', 'pending_approval', 'active', 'suspended', 'inactive'],
        default: 'draft',
      },
      metadata: { type: 'json' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_properties_provider_idx', fields: ['providerId'] },
      { name: 'hotel_properties_destination_idx', fields: ['destinationId'] },
      { name: 'hotel_properties_status_idx', fields: ['status'] },
    ],
    crud: makeCrud('HotelProperty', ['id', 'providerId', 'destinationId', 'name', 'slug', 'propertyType', 'starRating', 'city', 'country', 'status', 'coverImageUrl']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 2. PropertyAmenity
  // -------------------------------------------------------------
  PropertyAmenity: {
    table: 'property_amenities',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      category: {
        type: 'enum',
        values: ['general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports'],
        default: 'general',
      },
      amenityCode: { type: 'string', required: true, maxLength: 50 },
      name: { type: 'string', required: true, maxLength: 100 },
      isFree: { type: 'boolean', default: true },
      chargeAmount: { type: 'decimal', precision: 10, scale: 2 },
      chargeFrequency: {
        type: 'enum',
        values: ['one_time', 'per_night', 'per_stay', 'per_hour'],
        default: 'per_stay',
      },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'property_amenities_property_idx', fields: ['propertyId'] },
    ],
    crud: makeCrud('PropertyAmenity', ['id', 'propertyId', 'category', 'amenityCode', 'name', 'isFree', 'chargeAmount']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 3. RoomType
  // -------------------------------------------------------------
  RoomType: {
    table: 'room_types',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      name: { type: 'string', required: true, maxLength: 150 },
      slug: { type: 'string', required: true, maxLength: 180 },
      category: {
        type: 'enum',
        values: ['standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow'],
        default: 'standard_room',
      },
      maxOccupancyAdults: { type: 'integer', required: true, default: 2 },
      maxOccupancyChildren: { type: 'integer', default: 1 },
      maxTotalGuests: { type: 'integer', required: true, default: 3 },
      baseBedType: {
        type: 'enum',
        values: ['single', 'double', 'queen', 'king', 'twin', 'bunk_bed', 'sofa_bed'],
        default: 'queen',
      },
      extraBedAvailable: { type: 'boolean', default: false },
      extraBedCost: { type: 'decimal', precision: 10, scale: 2 },
      roomSizeSqm: { type: 'integer' },
      viewType: {
        type: 'enum',
        values: ['city_view', 'sea_view', 'garden_view', 'mountain_view', 'pool_view', 'courtyard_view', 'no_view'],
        default: 'city_view',
      },
      bathroomType: {
        type: 'enum',
        values: ['private_ensuite', 'shared_bathroom', 'open_plan'],
        default: 'private_ensuite',
      },
      smokingAllowed: { type: 'boolean', default: false },
      basePricePerNight: { type: 'decimal', precision: 12, scale: 2, required: true },
      totalUnitsCount: { type: 'integer', required: true, default: 1 },
      amenities: { type: 'json' },
      photos: { type: 'json' },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'room_types_property_idx', fields: ['propertyId'] },
      { name: 'room_types_category_idx', fields: ['category'] },
    ],
    crud: makeCrud('RoomType', ['id', 'propertyId', 'name', 'category', 'maxTotalGuests', 'basePricePerNight', 'totalUnitsCount', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 4. RoomUnit
  // -------------------------------------------------------------
  RoomUnit: {
    table: 'room_units',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      roomTypeId: { type: 'uuid', required: true, references: { entity: 'RoomType', field: 'id', onDelete: 'cascade' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      roomNumber: { type: 'string', required: true, maxLength: 20 },
      floorNumber: { type: 'integer', default: 1 },
      wingOrBuilding: { type: 'string', maxLength: 50 },
      physicalStatus: {
        type: 'enum',
        values: ['clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order'],
        default: 'clean',
      },
      currentOccupancyStatus: {
        type: 'enum',
        values: ['vacant', 'occupied', 'reserved'],
        default: 'vacant',
      },
      activeBookingId: { type: 'uuid' },
      cleanInspectedAt: { type: 'timestamp' },
      lastCleanedBy: { type: 'uuid' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'room_units_property_idx', fields: ['propertyId'] },
      { name: 'room_units_type_idx', fields: ['roomTypeId'] },
    ],
    crud: makeCrud('RoomUnit', ['id', 'roomTypeId', 'propertyId', 'roomNumber', 'floorNumber', 'physicalStatus', 'currentOccupancyStatus']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 5. RatePlan
  // -------------------------------------------------------------
  RatePlan: {
    table: 'rate_plans',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      roomTypeId: { type: 'uuid', required: true, references: { entity: 'RoomType', field: 'id', onDelete: 'cascade' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      planCode: { type: 'string', required: true, maxLength: 50 },
      name: { type: 'string', required: true, maxLength: 100 },
      mealPlanType: {
        type: 'enum',
        values: ['ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive'],
        default: 'cp_breakfast',
      },
      cancellationPolicyType: {
        type: 'enum',
        values: ['flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable'],
        default: 'flexible_24h',
      },
      cancellationCutoffHours: { type: 'integer', default: 24 },
      cancellationPenaltyPercent: { type: 'integer', default: 0 },
      isRefundable: { type: 'boolean', default: true },
      minimumStayNights: { type: 'integer', default: 1 },
      maximumStayNights: { type: 'integer', default: 30 },
      basePriceMultiplier: { type: 'decimal', precision: 5, scale: 4, default: '1.0000' },
      fixedSurcharge: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      isB2BExclusive: { type: 'boolean', default: false },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'rate_plans_room_type_idx', fields: ['roomTypeId'] },
      { name: 'rate_plans_property_idx', fields: ['propertyId'] },
    ],
    crud: makeCrud('RatePlan', ['id', 'roomTypeId', 'propertyId', 'planCode', 'name', 'mealPlanType', 'cancellationPolicyType', 'basePriceMultiplier', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 6. InventoryCalendar
  // -------------------------------------------------------------
  InventoryCalendar: {
    table: 'inventory_calendar',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      roomTypeId: { type: 'uuid', required: true, references: { entity: 'RoomType', field: 'id', onDelete: 'cascade' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      calendarDate: { type: 'string', required: true, maxLength: 10 },
      totalAvailable: { type: 'integer', required: true, default: 1 },
      bookedCount: { type: 'integer', default: 0 },
      blockedCount: { type: 'integer', default: 0 },
      stopSell: { type: 'boolean', default: false },
      closedToArrival: { type: 'boolean', default: false },
      closedToDeparture: { type: 'boolean', default: false },
      minStayNights: { type: 'integer', default: 1 },
      rateMultiplier: { type: 'decimal', precision: 5, scale: 4, default: '1.0000' },
      customBasePrice: { type: 'decimal', precision: 12, scale: 2 },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'inventory_calendar_date_idx', fields: ['roomTypeId', 'calendarDate'] },
    ],
    crud: makeCrud('InventoryCalendar', ['id', 'roomTypeId', 'propertyId', 'calendarDate', 'totalAvailable', 'bookedCount', 'stopSell', 'rateMultiplier']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 7. HotelBooking
  // -------------------------------------------------------------
  HotelBooking: {
    table: 'hotel_bookings',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      bookingReference: { type: 'string', required: true, unique: true, maxLength: 25 },
      travelerId: { type: 'uuid', references: { entity: 'User', field: 'id' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id' } },
      checkInDate: { type: 'string', required: true, maxLength: 10 },
      checkOutDate: { type: 'string', required: true, maxLength: 10 },
      totalNights: { type: 'integer', required: true, default: 1 },
      totalRooms: { type: 'integer', required: true, default: 1 },
      totalAdults: { type: 'integer', required: true, default: 2 },
      totalChildren: { type: 'integer', default: 0 },
      bookingStatus: {
        type: 'enum',
        values: ['pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded'],
        default: 'pending_payment',
      },
      totalAmount: { type: 'decimal', precision: 12, scale: 2, required: true },
      roomChargesAmount: { type: 'decimal', precision: 12, scale: 2, required: true },
      incidentalChargesAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      taxAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      commissionAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      netProviderAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      paymentStatus: {
        type: 'enum',
        values: ['pending', 'authorized', 'partially_paid', 'paid', 'refunded'],
        default: 'pending',
      },
      paymentMethod: { type: 'string', maxLength: 50 },
      depositAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      specialRequests: { type: 'text' },
      estimatedArrivalTime: { type: 'string', maxLength: 10 },
      contactName: { type: 'string', required: true, maxLength: 150 },
      contactEmail: { type: 'string', required: true, maxLength: 255 },
      contactPhone: { type: 'string', maxLength: 30 },
      confirmationQrCode: { type: 'string', maxLength: 500 },
      checkedInAt: { type: 'timestamp' },
      checkedOutAt: { type: 'timestamp' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_bookings_property_idx', fields: ['propertyId'] },
      { name: 'hotel_bookings_ref_idx', fields: ['bookingReference'] },
      { name: 'hotel_bookings_status_idx', fields: ['bookingStatus'] },
    ],
    crud: makeCrud('HotelBooking', ['id', 'bookingReference', 'propertyId', 'checkInDate', 'checkOutDate', 'bookingStatus', 'totalAmount', 'paymentStatus', 'contactName']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 8. HotelBookingRoom
  // -------------------------------------------------------------
  HotelBookingRoom: {
    table: 'hotel_booking_rooms',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      hotelBookingId: { type: 'uuid', required: true, references: { entity: 'HotelBooking', field: 'id', onDelete: 'cascade' } },
      roomTypeId: { type: 'uuid', required: true, references: { entity: 'RoomType', field: 'id' } },
      roomUnitId: { type: 'uuid', references: { entity: 'RoomUnit', field: 'id' } },
      ratePlanId: { type: 'uuid', references: { entity: 'RatePlan', field: 'id' } },
      guestName: { type: 'string', required: true, maxLength: 150 },
      guestEmail: { type: 'string', maxLength: 255 },
      nightlyRate: { type: 'decimal', precision: 12, scale: 2, required: true },
      roomNumberAssigned: { type: 'string', maxLength: 20 },
      assignedAt: { type: 'timestamp' },
      assignedBy: { type: 'uuid' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_booking_rooms_booking_idx', fields: ['hotelBookingId'] },
      { name: 'hotel_booking_rooms_unit_idx', fields: ['roomUnitId'] },
    ],
    crud: makeCrud('HotelBookingRoom', ['id', 'hotelBookingId', 'roomTypeId', 'roomUnitId', 'guestName', 'nightlyRate', 'roomNumberAssigned']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 9. HotelGuestFolio
  // -------------------------------------------------------------
  HotelGuestFolio: {
    table: 'hotel_guest_folios',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      hotelBookingId: { type: 'uuid', required: true, references: { entity: 'HotelBooking', field: 'id', onDelete: 'cascade' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id' } },
      roomNumber: { type: 'string', maxLength: 20 },
      chargeType: {
        type: 'enum',
        values: ['minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other'],
        default: 'room_service',
      },
      description: { type: 'string', required: true, maxLength: 255 },
      amount: { type: 'decimal', precision: 10, scale: 2, required: true },
      currency: { type: 'string', default: 'USD', maxLength: 3 },
      postedBy: { type: 'uuid' },
      invoiceNumber: { type: 'string', maxLength: 50 },
      receiptUrl: { type: 'string', maxLength: 500 },
      isPaid: { type: 'boolean', default: false },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_guest_folios_booking_idx', fields: ['hotelBookingId'] },
    ],
    crud: makeCrud('HotelGuestFolio', ['id', 'hotelBookingId', 'propertyId', 'roomNumber', 'chargeType', 'description', 'amount', 'isPaid']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 10. HotelMaintenanceTicket
  // -------------------------------------------------------------
  HotelMaintenanceTicket: {
    table: 'hotel_maintenance_tickets',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      roomUnitId: { type: 'uuid', references: { entity: 'RoomUnit', field: 'id' } },
      roomNumber: { type: 'string', maxLength: 20 },
      reportedBy: { type: 'uuid' },
      issueCategory: {
        type: 'enum',
        values: ['plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance'],
        default: 'plumbing',
      },
      priority: {
        type: 'enum',
        values: ['low', 'normal', 'high', 'urgent'],
        default: 'normal',
      },
      description: { type: 'text', required: true },
      photoUrls: { type: 'json' },
      status: {
        type: 'enum',
        values: ['open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled'],
        default: 'open',
      },
      assignedTo: { type: 'string', maxLength: 150 },
      resolutionNotes: { type: 'text' },
      costAmount: { type: 'decimal', precision: 10, scale: 2 },
      reportedAt: { type: 'timestamp', generated: 'createdAt' },
      resolvedAt: { type: 'timestamp' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_maintenance_tickets_property_idx', fields: ['propertyId'] },
      { name: 'hotel_maintenance_tickets_status_idx', fields: ['status'] },
    ],
    crud: makeCrud('HotelMaintenanceTicket', ['id', 'propertyId', 'roomNumber', 'issueCategory', 'priority', 'status', 'assignedTo', 'reportedAt']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 11. HotelUpsellOffer
  // -------------------------------------------------------------
  HotelUpsellOffer: {
    table: 'hotel_upsell_offers',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id', onDelete: 'cascade' } },
      offerType: {
        type: 'enum',
        values: ['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass'],
        default: 'room_upgrade',
      },
      title: { type: 'string', required: true, maxLength: 150 },
      description: { type: 'text' },
      targetRoomTypeId: { type: 'uuid', references: { entity: 'RoomType', field: 'id' } },
      upgradedRoomTypeId: { type: 'uuid', references: { entity: 'RoomType', field: 'id' } },
      additionalPricePerNight: { type: 'decimal', precision: 10, scale: 2, required: true },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_upsell_offers_property_idx', fields: ['propertyId'] },
    ],
    crud: makeCrud('HotelUpsellOffer', ['id', 'propertyId', 'offerType', 'title', 'additionalPricePerNight', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 12. HotelUpsellConversion
  // -------------------------------------------------------------
  HotelUpsellConversion: {
    table: 'hotel_upsell_conversions',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      offerId: { type: 'uuid', required: true, references: { entity: 'HotelUpsellOffer', field: 'id' } },
      hotelBookingId: { type: 'uuid', required: true, references: { entity: 'HotelBooking', field: 'id', onDelete: 'cascade' } },
      revenueAmount: { type: 'decimal', precision: 10, scale: 2, required: true },
      guestEmail: { type: 'string', maxLength: 255 },
      acceptedAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_upsell_conversions_booking_idx', fields: ['hotelBookingId'] },
    ],
    crud: makeCrud('HotelUpsellConversion', ['id', 'offerId', 'hotelBookingId', 'revenueAmount', 'guestEmail', 'acceptedAt']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 13. HotelReview
  // -------------------------------------------------------------
  HotelReview: {
    table: 'hotel_reviews',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      hotelBookingId: { type: 'uuid', required: true, references: { entity: 'HotelBooking', field: 'id' } },
      propertyId: { type: 'uuid', required: true, references: { entity: 'HotelProperty', field: 'id' } },
      travelerId: { type: 'uuid', references: { entity: 'User', field: 'id' } },
      overallRating: { type: 'integer', required: true, default: 5 },
      cleanlinessRating: { type: 'integer', default: 5 },
      locationRating: { type: 'integer', default: 5 },
      serviceRating: { type: 'integer', default: 5 },
      facilitiesRating: { type: 'integer', default: 5 },
      valueRating: { type: 'integer', default: 5 },
      reviewTitle: { type: 'string', maxLength: 200 },
      reviewText: { type: 'text' },
      photoUrls: { type: 'json' },
      isVerifiedStay: { type: 'boolean', default: true },
      providerResponseText: { type: 'text' },
      providerRespondedAt: { type: 'timestamp' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'hotel_reviews_property_idx', fields: ['propertyId'] },
      { name: 'hotel_reviews_booking_idx', fields: ['hotelBookingId'] },
    ],
    crud: makeCrud('HotelReview', ['id', 'hotelBookingId', 'propertyId', 'overallRating', 'reviewTitle', 'isVerifiedStay', 'createdAt']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 14. Vehicle
  // -------------------------------------------------------------
  Vehicle: {
    table: 'vehicles',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      providerId: { type: 'uuid', required: true, references: { entity: 'Provider', field: 'id' } },
      registrationNumber: { type: 'string', required: true, unique: true, maxLength: 50 },
      vinNumber: { type: 'string', maxLength: 50 },
      make: { type: 'string', required: true, maxLength: 50 },
      model: { type: 'string', required: true, maxLength: 50 },
      year: { type: 'integer', required: true },
      category: {
        type: 'enum',
        values: ['four_wheeler', 'two_wheeler', 'three_wheeler_cng'],
        default: 'four_wheeler',
      },
      subCategory: {
        type: 'enum',
        values: [
          'economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan',
          'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan',
          'minibus', 'tourist_microbus', 'tourist_coach',
          'commuter_scooter', 'premium_scooter', 'adventure_touring_bike',
          'electric_scooter', 'electric_bicycle',
          'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike',
        ],
        default: 'economy_sedan',
      },
      seatingCapacity: { type: 'integer', required: true, default: 5 },
      luggageCapacityLarge: { type: 'integer', default: 2 },
      luggageCapacitySmall: { type: 'integer', default: 2 },
      transmission: {
        type: 'enum',
        values: ['automatic', 'manual', 'direct_drive'],
        default: 'automatic',
      },
      fuelType: {
        type: 'enum',
        values: ['petrol', 'octane', 'diesel', 'hybrid_petrol', 'hybrid_diesel', 'full_electric', 'cng', 'lpg'],
        default: 'petrol',
      },
      driveTrain: {
        type: 'enum',
        values: ['fwd', 'rwd', 'awd_4x4'],
        default: 'fwd',
      },
      color: { type: 'string', maxLength: 40 },
      airConditioning: {
        type: 'enum',
        values: ['climate_control', 'manual_ac', 'none'],
        default: 'climate_control',
      },
      engineDisplacementCc: { type: 'integer' },
      currentOdometerKm: { type: 'integer', default: 0 },
      currentFuelLevelPercent: { type: 'integer', default: 100 },
      cngCylinderTestExpiry: { type: 'string', maxLength: 10 },
      activeStatus: {
        type: 'enum',
        values: ['active', 'maintenance', 'compliance_hold', 'retired', 'inactive'],
        default: 'active',
      },
      isAvailableForRental: { type: 'boolean', default: true },
      isAvailableWithDriver: { type: 'boolean', default: true },
      currentLocationAddress: { type: 'string', maxLength: 300 },
      latitude: { type: 'decimal', precision: 10, scale: 7 },
      longitude: { type: 'decimal', precision: 10, scale: 7 },
      photos: { type: 'json' },
      features: { type: 'json' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicles_provider_idx', fields: ['providerId'] },
      { name: 'vehicles_category_idx', fields: ['category'] },
      { name: 'vehicles_status_idx', fields: ['activeStatus'] },
    ],
    crud: makeCrud('Vehicle', ['id', 'providerId', 'registrationNumber', 'make', 'model', 'year', 'category', 'subCategory', 'activeStatus', 'isAvailableForRental']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 15. VehicleComplianceDoc
  // -------------------------------------------------------------
  VehicleComplianceDoc: {
    table: 'vehicle_compliance_docs',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleId: { type: 'uuid', required: true, references: { entity: 'Vehicle', field: 'id', onDelete: 'cascade' } },
      documentType: {
        type: 'enum',
        values: ['registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate'],
        default: 'registration_card',
      },
      documentNumber: { type: 'string', required: true, maxLength: 100 },
      issuedDate: { type: 'string', maxLength: 10 },
      expiryDate: { type: 'string', required: true, maxLength: 10 },
      documentFileUrl: { type: 'string', required: true, maxLength: 500 },
      verificationStatus: {
        type: 'enum',
        values: ['pending', 'verified', 'rejected', 'expired'],
        default: 'pending',
      },
      verifiedBy: { type: 'uuid' },
      verifiedAt: { type: 'timestamp' },
      notes: { type: 'text' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_compliance_docs_vehicle_idx', fields: ['vehicleId'] },
      { name: 'vehicle_compliance_docs_expiry_idx', fields: ['expiryDate'] },
    ],
    crud: makeCrud('VehicleComplianceDoc', ['id', 'vehicleId', 'documentType', 'documentNumber', 'expiryDate', 'verificationStatus']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 16. VehiclePricingPlan
  // -------------------------------------------------------------
  VehiclePricingPlan: {
    table: 'vehicle_pricing_plans',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleId: { type: 'uuid', required: true, references: { entity: 'Vehicle', field: 'id', onDelete: 'cascade' } },
      rentalModel: {
        type: 'enum',
        values: ['self_drive', 'with_driver', 'both'],
        default: 'self_drive',
      },
      baseHourlyRate: { type: 'decimal', precision: 10, scale: 2 },
      baseDailyRate: { type: 'decimal', precision: 10, scale: 2, required: true },
      weeklyRate: { type: 'decimal', precision: 10, scale: 2 },
      depositAmount: { type: 'decimal', precision: 10, scale: 2, default: '200.00' },
      freeKmPerDay: { type: 'integer', default: 150 },
      excessKmRate: { type: 'decimal', precision: 8, scale: 2, default: '0.25' },
      fuelPolicyCode: {
        type: 'enum',
        values: ['full_to_full', 'same_to_same', 'pre_purchase_full', 'provider_filled'],
        default: 'full_to_full',
      },
      isB2BExclusive: { type: 'boolean', default: false },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_pricing_plans_vehicle_idx', fields: ['vehicleId'] },
    ],
    crud: makeCrud('VehiclePricingPlan', ['id', 'vehicleId', 'rentalModel', 'baseDailyRate', 'weeklyRate', 'depositAmount', 'freeKmPerDay', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 17. VehicleTransferRoute
  // -------------------------------------------------------------
  VehicleTransferRoute: {
    table: 'vehicle_transfer_routes',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      providerId: { type: 'uuid', required: true, references: { entity: 'Provider', field: 'id' } },
      originName: { type: 'string', required: true, maxLength: 150 },
      originCoordinates: { type: 'string', maxLength: 50 },
      destinationName: { type: 'string', required: true, maxLength: 150 },
      destinationCoordinates: { type: 'string', maxLength: 50 },
      distanceKm: { type: 'decimal', precision: 8, scale: 2 },
      estimatedDurationMinutes: { type: 'integer' },
      vehicleCategory: {
        type: 'enum',
        values: ['economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw'],
        default: 'economy_sedan',
      },
      fixedFareAmount: { type: 'decimal', precision: 10, scale: 2, required: true },
      driverAllowanceAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      tollIncluded: { type: 'boolean', default: true },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_transfer_routes_provider_idx', fields: ['providerId'] },
    ],
    crud: makeCrud('VehicleTransferRoute', ['id', 'providerId', 'originName', 'destinationName', 'vehicleCategory', 'fixedFareAmount', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 18. VehicleProtectionPlan
  // -------------------------------------------------------------
  VehicleProtectionPlan: {
    table: 'vehicle_protection_plans',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      planCode: {
        type: 'enum',
        values: ['basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance'],
        default: 'collision_damage_waiver',
      },
      name: { type: 'string', required: true, maxLength: 100 },
      description: { type: 'text' },
      dailyRate: { type: 'decimal', precision: 8, scale: 2, required: true },
      collisionDeductibleAmount: { type: 'decimal', precision: 10, scale: 2, default: '200.00' },
      theftDeductibleAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      glassTireCovered: { type: 'boolean', default: false },
      roadsideAssistanceCovered: { type: 'boolean', default: false },
      isActive: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [],
    crud: makeCrud('VehicleProtectionPlan', ['id', 'planCode', 'name', 'dailyRate', 'collisionDeductibleAmount', 'theftDeductibleAmount', 'isActive']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 19. Driver
  // -------------------------------------------------------------
  Driver: {
    table: 'drivers',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      providerId: { type: 'uuid', required: true, references: { entity: 'Provider', field: 'id' } },
      userId: { type: 'uuid', references: { entity: 'User', field: 'id' } },
      fullName: { type: 'string', required: true, maxLength: 150 },
      phone: { type: 'string', required: true, maxLength: 30 },
      email: { type: 'string', maxLength: 255 },
      licenseNumber: { type: 'string', required: true, maxLength: 50 },
      licenseCategory: { type: 'string', default: 'Commercial', maxLength: 50 },
      licenseExpiryDate: { type: 'string', required: true, maxLength: 10 },
      licensePhotoFrontUrl: { type: 'string', maxLength: 500 },
      licensePhotoBackUrl: { type: 'string', maxLength: 500 },
      driverPhotoUrl: { type: 'string', maxLength: 500 },
      yearsOfExperience: { type: 'integer', default: 3 },
      assignedVehicleId: { type: 'uuid', references: { entity: 'Vehicle', field: 'id' } },
      dutyStatus: {
        type: 'enum',
        values: ['available', 'on_trip', 'off_duty', 'suspended'],
        default: 'available',
      },
      currentLatitude: { type: 'decimal', precision: 10, scale: 7 },
      currentLongitude: { type: 'decimal', precision: 10, scale: 7 },
      overallRating: { type: 'decimal', precision: 3, scale: 2, default: '5.00' },
      completedTripsCount: { type: 'integer', default: 0 },
      isVerified: { type: 'boolean', default: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'drivers_provider_idx', fields: ['providerId'] },
      { name: 'drivers_duty_idx', fields: ['dutyStatus'] },
    ],
    crud: makeCrud('Driver', ['id', 'providerId', 'fullName', 'phone', 'licenseNumber', 'dutyStatus', 'overallRating', 'completedTripsCount']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 20. VehicleBooking
  // -------------------------------------------------------------
  VehicleBooking: {
    table: 'vehicle_bookings',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      bookingReference: { type: 'string', required: true, unique: true, maxLength: 25 },
      travelerId: { type: 'uuid', references: { entity: 'User', field: 'id' } },
      providerId: { type: 'uuid', required: true, references: { entity: 'Provider', field: 'id' } },
      vehicleId: { type: 'uuid', references: { entity: 'Vehicle', field: 'id' } },
      driverId: { type: 'uuid', references: { entity: 'Driver', field: 'id' } },
      rentalModel: {
        type: 'enum',
        values: ['self_drive', 'with_driver'],
        default: 'self_drive',
      },
      serviceType: {
        type: 'enum',
        values: ['self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation'],
        default: 'self_drive_rental',
      },
      pickupDateTime: { type: 'timestamp', required: true },
      returnDateTime: { type: 'timestamp', required: true },
      pickupLocationAddress: { type: 'string', required: true, maxLength: 300 },
      pickupLatitude: { type: 'decimal', precision: 10, scale: 7 },
      pickupLongitude: { type: 'decimal', precision: 10, scale: 7 },
      dropoffLocationAddress: { type: 'string', maxLength: 300 },
      dropoffLatitude: { type: 'decimal', precision: 10, scale: 7 },
      dropoffLongitude: { type: 'decimal', precision: 10, scale: 7 },
      flightNumber: { type: 'string', maxLength: 20 },
      flightEta: { type: 'string', maxLength: 20 },
      passengerCount: { type: 'integer', default: 1 },
      bookingStatus: {
        type: 'enum',
        values: ['pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled'],
        default: 'pending_payment',
      },
      baseRentalAmount: { type: 'decimal', precision: 12, scale: 2, required: true },
      extrasAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      protectionPlanAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      driverAllowanceAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      taxAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      totalAmount: { type: 'decimal', precision: 12, scale: 2, required: true },
      securityDepositAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      depositHoldStatus: {
        type: 'enum',
        values: ['none', 'authorized', 'captured', 'partial_released', 'fully_released', 'forfeited'],
        default: 'none',
      },
      commissionAmount: { type: 'decimal', precision: 10, scale: 2, default: '0.00' },
      netProviderAmount: { type: 'decimal', precision: 12, scale: 2, default: '0.00' },
      paymentStatus: {
        type: 'enum',
        values: ['pending', 'authorized', 'paid', 'refunded'],
        default: 'pending',
      },
      otpCode: { type: 'string', maxLength: 6 },
      qrCode: { type: 'string', maxLength: 500 },
      startedAt: { type: 'timestamp' },
      completedAt: { type: 'timestamp' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      updatedAt: { type: 'timestamp', generated: 'updatedAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_bookings_ref_idx', fields: ['bookingReference'] },
      { name: 'vehicle_bookings_provider_idx', fields: ['providerId'] },
      { name: 'vehicle_bookings_status_idx', fields: ['bookingStatus'] },
    ],
    crud: makeCrud('VehicleBooking', ['id', 'bookingReference', 'providerId', 'vehicleId', 'rentalModel', 'serviceType', 'bookingStatus', 'totalAmount', 'paymentStatus']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 21. VehicleBookingExtra
  // -------------------------------------------------------------
  VehicleBookingExtra: {
    table: 'vehicle_booking_extras',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleBookingId: { type: 'uuid', required: true, references: { entity: 'VehicleBooking', field: 'id', onDelete: 'cascade' } },
      extraType: {
        type: 'enum',
        values: ['child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone'],
        default: 'child_seat_infant',
      },
      name: { type: 'string', required: true, maxLength: 100 },
      dailyRate: { type: 'decimal', precision: 8, scale: 2, required: true },
      quantity: { type: 'integer', default: 1 },
      totalAmount: { type: 'decimal', precision: 10, scale: 2, required: true },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_booking_extras_booking_idx', fields: ['vehicleBookingId'] },
    ],
    crud: makeCrud('VehicleBookingExtra', ['id', 'vehicleBookingId', 'extraType', 'name', 'dailyRate', 'quantity', 'totalAmount']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 22. VehicleInspection
  // -------------------------------------------------------------
  VehicleInspection: {
    table: 'vehicle_inspections',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleBookingId: { type: 'uuid', required: true, references: { entity: 'VehicleBooking', field: 'id', onDelete: 'cascade' } },
      vehicleId: { type: 'uuid', required: true, references: { entity: 'Vehicle', field: 'id' } },
      inspectionType: {
        type: 'enum',
        values: ['pre_handover', 'post_return'],
        default: 'pre_handover',
      },
      odometerKm: { type: 'integer', required: true },
      fuelPercent: { type: 'integer', required: true, default: 100 },
      cngPressureBar: { type: 'integer' },
      damageMarkers: { type: 'json' },
      generalNotes: { type: 'text' },
      photoUrls: { type: 'json' },
      inspectorUserId: { type: 'uuid' },
      customerSignatureUrl: { type: 'string', maxLength: 500 },
      inspectorSignatureUrl: { type: 'string', maxLength: 500 },
      inspectionPdfUrl: { type: 'string', maxLength: 500 },
      inspectedAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_inspections_booking_idx', fields: ['vehicleBookingId'] },
    ],
    crud: makeCrud('VehicleInspection', ['id', 'vehicleBookingId', 'vehicleId', 'inspectionType', 'odometerKm', 'fuelPercent', 'inspectedAt']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 23. VehicleExtraCharge
  // -------------------------------------------------------------
  VehicleExtraCharge: {
    table: 'vehicle_extra_charges',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleBookingId: { type: 'uuid', required: true, references: { entity: 'VehicleBooking', field: 'id', onDelete: 'cascade' } },
      chargeType: {
        type: 'enum',
        values: ['excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee'],
        default: 'excess_km',
      },
      description: { type: 'string', required: true, maxLength: 255 },
      amount: { type: 'decimal', precision: 10, scale: 2, required: true },
      deductionSource: {
        type: 'enum',
        values: ['security_deposit', 'direct_bill'],
        default: 'security_deposit',
      },
      proofPhotoUrls: { type: 'json' },
      status: {
        type: 'enum',
        values: ['pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled'],
        default: 'pending_review',
      },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_extra_charges_booking_idx', fields: ['vehicleBookingId'] },
    ],
    crud: makeCrud('VehicleExtraCharge', ['id', 'vehicleBookingId', 'chargeType', 'description', 'amount', 'deductionSource', 'status']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 24. VehicleMaintenanceLog
  // -------------------------------------------------------------
  VehicleMaintenanceLog: {
    table: 'vehicle_maintenance_logs',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleId: { type: 'uuid', required: true, references: { entity: 'Vehicle', field: 'id', onDelete: 'cascade' } },
      serviceType: {
        type: 'enum',
        values: ['scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint'],
        default: 'scheduled_periodic',
      },
      description: { type: 'text', required: true },
      odometerAtService: { type: 'integer', required: true },
      serviceCost: { type: 'decimal', precision: 10, scale: 2, required: true },
      serviceProviderName: { type: 'string', maxLength: 150 },
      invoicePdfUrl: { type: 'string', maxLength: 500 },
      servicedAt: { type: 'timestamp', generated: 'createdAt' },
      nextServiceDueOdometer: { type: 'integer' },
      nextServiceDueDate: { type: 'string', maxLength: 10 },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_maintenance_logs_vehicle_idx', fields: ['vehicleId'] },
    ],
    crud: makeCrud('VehicleMaintenanceLog', ['id', 'vehicleId', 'serviceType', 'odometerAtService', 'serviceCost', 'servicedAt']),
    timestamps: true,
  },

  // -------------------------------------------------------------
  // 25. VehicleReview
  // -------------------------------------------------------------
  VehicleReview: {
    table: 'vehicle_reviews',
    fields: {
      id: { type: 'uuid', primary: true, generated: true },
      vehicleBookingId: { type: 'uuid', required: true, references: { entity: 'VehicleBooking', field: 'id' } },
      vehicleId: { type: 'uuid', references: { entity: 'Vehicle', field: 'id' } },
      driverId: { type: 'uuid', references: { entity: 'Driver', field: 'id' } },
      travelerId: { type: 'uuid', references: { entity: 'User', field: 'id' } },
      overallRating: { type: 'integer', required: true, default: 5 },
      vehicleConditionRating: { type: 'integer', default: 5 },
      driverProfessionalismRating: { type: 'integer', default: 5 },
      punctualityRating: { type: 'integer', default: 5 },
      valueRating: { type: 'integer', default: 5 },
      reviewText: { type: 'text' },
      photoUrls: { type: 'json' },
      isVerifiedRental: { type: 'boolean', default: true },
      providerResponseText: { type: 'text' },
      createdAt: { type: 'timestamp', generated: 'createdAt' },
      deletedAt: { type: 'timestamp' },
    },
    indexes: [
      { name: 'vehicle_reviews_vehicle_idx', fields: ['vehicleId'] },
      { name: 'vehicle_reviews_driver_idx', fields: ['driverId'] },
    ],
    crud: makeCrud('VehicleReview', ['id', 'vehicleBookingId', 'vehicleId', 'driverId', 'overallRating', 'isVerifiedRental', 'createdAt']),
    timestamps: true,
  },
};

const travellerAppPath = path.resolve(__dirname, 'traveller-application.json');
const baseSpec = JSON.parse(fs.readFileSync(travellerAppPath, 'utf-8'));

baseSpec.entities = {
  ...baseSpec.entities,
  ...entities,
};

fs.writeFileSync(travellerAppPath, JSON.stringify(baseSpec, null, 2), 'utf-8');
console.log(`✅ Merged 25 entities into ${travellerAppPath}. Total entities: ${Object.keys(baseSpec.entities).length}`);

const hotelVehicleEntityNames = Object.keys(entities);
fs.writeFileSync(
  path.resolve(__dirname, 'schemas/hotel-vehicle-entity-names.json'),
  JSON.stringify(hotelVehicleEntityNames, null, 2),
  'utf-8'
);

