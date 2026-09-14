CREATE TYPE "public"."drivers_duty_status" AS ENUM('available', 'on_trip', 'off_duty', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."hotel_bookings_booking_status" AS ENUM('pending_payment', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show', 'refund_pending', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."hotel_bookings_payment_status" AS ENUM('pending', 'authorized', 'partially_paid', 'paid', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."hotel_guest_folios_charge_type" AS ENUM('minibar', 'room_service', 'laundry', 'late_checkout', 'early_checkin', 'spa', 'damage', 'parking', 'other');--> statement-breakpoint
CREATE TYPE "public"."hotel_maintenance_tickets_issue_category" AS ENUM('plumbing', 'electrical', 'hvac_aircon', 'furniture_fixtures', 'carpentry', 'lock_keycard', 'cleanliness_deep', 'pest_control', 'appliance');--> statement-breakpoint
CREATE TYPE "public"."hotel_maintenance_tickets_priority" AS ENUM('low', 'normal', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."hotel_maintenance_tickets_status" AS ENUM('open', 'assigned', 'in_progress', 'resolved', 'cannot_reproduce', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."hotel_properties_property_type" AS ENUM('hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping');--> statement-breakpoint
CREATE TYPE "public"."hotel_properties_status" AS ENUM('draft', 'pending_approval', 'active', 'suspended', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."hotel_upsell_offers_offer_type" AS ENUM('room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass');--> statement-breakpoint
CREATE TYPE "public"."property_amenities_category" AS ENUM('general', 'room', 'wellness_spa', 'dining', 'business', 'accessibility', 'family_kids', 'outdoor_sports');--> statement-breakpoint
CREATE TYPE "public"."property_amenities_charge_frequency" AS ENUM('one_time', 'per_night', 'per_stay', 'per_hour');--> statement-breakpoint
CREATE TYPE "public"."rate_plans_cancellation_policy_type" AS ENUM('flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable');--> statement-breakpoint
CREATE TYPE "public"."rate_plans_meal_plan_type" AS ENUM('ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive');--> statement-breakpoint
CREATE TYPE "public"."room_types_base_bed_type" AS ENUM('single', 'double', 'queen', 'king', 'twin', 'bunk_bed', 'sofa_bed');--> statement-breakpoint
CREATE TYPE "public"."room_types_bathroom_type" AS ENUM('private_ensuite', 'shared_bathroom', 'open_plan');--> statement-breakpoint
CREATE TYPE "public"."room_types_category" AS ENUM('standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow');--> statement-breakpoint
CREATE TYPE "public"."room_types_view_type" AS ENUM('city_view', 'sea_view', 'garden_view', 'mountain_view', 'pool_view', 'courtyard_view', 'no_view');--> statement-breakpoint
CREATE TYPE "public"."room_units_current_occupancy_status" AS ENUM('vacant', 'occupied', 'reserved');--> statement-breakpoint
CREATE TYPE "public"."room_units_physical_status" AS ENUM('clean', 'dirty', 'cleaning_in_progress', 'inspected', 'out_of_order');--> statement-breakpoint
CREATE TYPE "public"."vehicle_booking_extras_extra_type" AS ENUM('child_seat_infant', 'child_seat_toddler', 'booster_seat', 'gps_navigator', 'roof_luggage_carrier', 'wifi_hotspot', 'additional_driver', 'satellite_phone');--> statement-breakpoint
CREATE TYPE "public"."vehicle_bookings_booking_status" AS ENUM('pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."vehicle_bookings_deposit_hold_status" AS ENUM('none', 'authorized', 'captured', 'partial_released', 'fully_released', 'forfeited');--> statement-breakpoint
CREATE TYPE "public"."vehicle_bookings_payment_status" AS ENUM('pending', 'authorized', 'paid', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."vehicle_bookings_rental_model" AS ENUM('self_drive', 'with_driver');--> statement-breakpoint
CREATE TYPE "public"."vehicle_bookings_service_type" AS ENUM('self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation');--> statement-breakpoint
CREATE TYPE "public"."vehicle_compliance_docs_document_type" AS ENUM('registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate');--> statement-breakpoint
CREATE TYPE "public"."vehicle_compliance_docs_verification_status" AS ENUM('pending', 'verified', 'rejected', 'expired');--> statement-breakpoint
CREATE TYPE "public"."vehicle_extra_charges_charge_type" AS ENUM('excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee');--> statement-breakpoint
CREATE TYPE "public"."vehicle_extra_charges_deduction_source" AS ENUM('security_deposit', 'direct_bill');--> statement-breakpoint
CREATE TYPE "public"."vehicle_extra_charges_status" AS ENUM('pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled');--> statement-breakpoint
CREATE TYPE "public"."vehicle_inspections_inspection_type" AS ENUM('pre_handover', 'post_return');--> statement-breakpoint
CREATE TYPE "public"."vehicle_maintenance_logs_service_type" AS ENUM('scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint');--> statement-breakpoint
CREATE TYPE "public"."vehicle_pricing_plans_fuel_policy_code" AS ENUM('full_to_full', 'same_to_same', 'pre_purchase_full', 'provider_filled');--> statement-breakpoint
CREATE TYPE "public"."vehicle_pricing_plans_rental_model" AS ENUM('self_drive', 'with_driver', 'both');--> statement-breakpoint
CREATE TYPE "public"."vehicle_protection_plans_plan_code" AS ENUM('basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance');--> statement-breakpoint
CREATE TYPE "public"."vehicle_transfer_routes_vehicle_category" AS ENUM('economy_sedan', 'compact_suv', 'fullsize_suv_4x4', 'minivan', 'tourist_microbus', 'cng_auto_rickshaw');--> statement-breakpoint
CREATE TYPE "public"."vehicles_active_status" AS ENUM('active', 'maintenance', 'compliance_hold', 'retired', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."vehicles_air_conditioning" AS ENUM('climate_control', 'manual_ac', 'none');--> statement-breakpoint
CREATE TYPE "public"."vehicles_category" AS ENUM('four_wheeler', 'two_wheeler', 'three_wheeler_cng');--> statement-breakpoint
CREATE TYPE "public"."vehicles_drive_train" AS ENUM('fwd', 'rwd', 'awd_4x4');--> statement-breakpoint
CREATE TYPE "public"."vehicles_fuel_type" AS ENUM('petrol', 'octane', 'diesel', 'hybrid_petrol', 'hybrid_diesel', 'full_electric', 'cng', 'lpg');--> statement-breakpoint
CREATE TYPE "public"."vehicles_sub_category" AS ENUM('economy_sedan', 'compact_hatchback', 'midsize_sedan', 'premium_sedan', 'compact_suv', 'fullsize_suv_4x4', 'luxury_suv', 'minivan', 'minibus', 'tourist_microbus', 'tourist_coach', 'commuter_scooter', 'premium_scooter', 'adventure_touring_bike', 'electric_scooter', 'electric_bicycle', 'cng_auto_rickshaw', 'tuktuk_rickshaw', 'electric_easy_bike');--> statement-breakpoint
CREATE TYPE "public"."vehicles_transmission" AS ENUM('automatic', 'manual', 'direct_drive');--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"user_id" uuid,
	"full_name" varchar(150) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"email" varchar(255),
	"license_number" varchar(50) NOT NULL,
	"license_category" varchar(50) DEFAULT 'Commercial',
	"license_expiry_date" varchar(10) NOT NULL,
	"license_photo_front_url" varchar(500),
	"license_photo_back_url" varchar(500),
	"driver_photo_url" varchar(500),
	"years_of_experience" integer DEFAULT 3,
	"assigned_vehicle_id" uuid,
	"duty_status" "drivers_duty_status" DEFAULT 'available',
	"current_latitude" numeric(10, 7),
	"current_longitude" numeric(10, 7),
	"overall_rating" numeric(3, 2) DEFAULT '5.00',
	"completed_trips_count" integer DEFAULT 0,
	"is_verified" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_booking_rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_booking_id" uuid NOT NULL,
	"room_type_id" uuid NOT NULL,
	"room_unit_id" uuid,
	"rate_plan_id" uuid,
	"guest_name" varchar(150) NOT NULL,
	"guest_email" varchar(255),
	"nightly_rate" numeric(12, 2) NOT NULL,
	"room_number_assigned" varchar(20),
	"assigned_at" timestamp with time zone,
	"assigned_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_reference" varchar(25) NOT NULL,
	"traveler_id" uuid,
	"property_id" uuid NOT NULL,
	"check_in_date" varchar(10) NOT NULL,
	"check_out_date" varchar(10) NOT NULL,
	"total_nights" integer DEFAULT 1 NOT NULL,
	"total_rooms" integer DEFAULT 1 NOT NULL,
	"total_adults" integer DEFAULT 2 NOT NULL,
	"total_children" integer DEFAULT 0,
	"booking_status" "hotel_bookings_booking_status" DEFAULT 'pending_payment',
	"total_amount" numeric(12, 2) NOT NULL,
	"room_charges_amount" numeric(12, 2) NOT NULL,
	"incidental_charges_amount" numeric(12, 2) DEFAULT '0.00',
	"tax_amount" numeric(12, 2) DEFAULT '0.00',
	"commission_amount" numeric(12, 2) DEFAULT '0.00',
	"net_provider_amount" numeric(12, 2) DEFAULT '0.00',
	"payment_status" "hotel_bookings_payment_status" DEFAULT 'pending',
	"payment_method" varchar(50),
	"deposit_amount" numeric(12, 2) DEFAULT '0.00',
	"special_requests" text,
	"estimated_arrival_time" varchar(10),
	"contact_name" varchar(150) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"contact_phone" varchar(30),
	"confirmation_qr_code" varchar(500),
	"checked_in_at" timestamp with time zone,
	"checked_out_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "hotel_bookings_booking_reference_unique" UNIQUE("booking_reference")
);
--> statement-breakpoint
CREATE TABLE "hotel_guest_folios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_booking_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"room_number" varchar(20),
	"charge_type" "hotel_guest_folios_charge_type" DEFAULT 'room_service',
	"description" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"posted_by" uuid,
	"invoice_number" varchar(50),
	"receipt_url" varchar(500),
	"is_paid" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_maintenance_tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"room_unit_id" uuid,
	"room_number" varchar(20),
	"reported_by" uuid,
	"issue_category" "hotel_maintenance_tickets_issue_category" DEFAULT 'plumbing',
	"priority" "hotel_maintenance_tickets_priority" DEFAULT 'normal',
	"description" text NOT NULL,
	"photo_urls" jsonb,
	"status" "hotel_maintenance_tickets_status" DEFAULT 'open',
	"assigned_to" varchar(150),
	"resolution_notes" text,
	"cost_amount" numeric(10, 2),
	"reported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"resolved_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"destination_id" uuid,
	"name" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"property_type" "hotel_properties_property_type" DEFAULT 'hotel',
	"star_rating" integer DEFAULT 3,
	"check_in_time" varchar(10) DEFAULT '14:00',
	"check_out_time" varchar(10) DEFAULT '11:00',
	"address" varchar(500) NOT NULL,
	"city" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"postal_code" varchar(20),
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"phone" varchar(30),
	"email" varchar(255),
	"description" text,
	"cover_image_url" varchar(500),
	"gallery_urls" jsonb,
	"tax_id" varchar(100),
	"business_registration_number" varchar(100),
	"status" "hotel_properties_status" DEFAULT 'draft',
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "hotel_properties_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "hotel_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_booking_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"traveler_id" uuid,
	"overall_rating" integer DEFAULT 5 NOT NULL,
	"cleanliness_rating" integer DEFAULT 5,
	"location_rating" integer DEFAULT 5,
	"service_rating" integer DEFAULT 5,
	"facilities_rating" integer DEFAULT 5,
	"value_rating" integer DEFAULT 5,
	"review_title" varchar(200),
	"review_text" text,
	"photo_urls" jsonb,
	"is_verified_stay" boolean DEFAULT true,
	"provider_response_text" text,
	"provider_responded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_upsell_conversions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offer_id" uuid NOT NULL,
	"hotel_booking_id" uuid NOT NULL,
	"revenue_amount" numeric(10, 2) NOT NULL,
	"guest_email" varchar(255),
	"accepted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hotel_upsell_offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"offer_type" "hotel_upsell_offers_offer_type" DEFAULT 'room_upgrade',
	"title" varchar(150) NOT NULL,
	"description" text,
	"target_room_type_id" uuid,
	"upgraded_room_type_id" uuid,
	"additional_price_per_night" numeric(10, 2) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory_calendar" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_type_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"calendar_date" varchar(10) NOT NULL,
	"total_available" integer DEFAULT 1 NOT NULL,
	"booked_count" integer DEFAULT 0,
	"blocked_count" integer DEFAULT 0,
	"stop_sell" boolean DEFAULT false,
	"closed_to_arrival" boolean DEFAULT false,
	"closed_to_departure" boolean DEFAULT false,
	"min_stay_nights" integer DEFAULT 1,
	"rate_multiplier" numeric(5, 4) DEFAULT '1.0000',
	"custom_base_price" numeric(12, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "property_amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"category" "property_amenities_category" DEFAULT 'general',
	"amenity_code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_free" boolean DEFAULT true,
	"charge_amount" numeric(10, 2),
	"charge_frequency" "property_amenities_charge_frequency" DEFAULT 'per_stay',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_type_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"plan_code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"meal_plan_type" "rate_plans_meal_plan_type" DEFAULT 'cp_breakfast',
	"cancellation_policy_type" "rate_plans_cancellation_policy_type" DEFAULT 'flexible_24h',
	"cancellation_cutoff_hours" integer DEFAULT 24,
	"cancellation_penalty_percent" integer DEFAULT 0,
	"is_refundable" boolean DEFAULT true,
	"minimum_stay_nights" integer DEFAULT 1,
	"maximum_stay_nights" integer DEFAULT 30,
	"base_price_multiplier" numeric(5, 4) DEFAULT '1.0000',
	"fixed_surcharge" numeric(10, 2) DEFAULT '0.00',
	"is_b2b_exclusive" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "room_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"category" "room_types_category" DEFAULT 'standard_room',
	"max_occupancy_adults" integer DEFAULT 2 NOT NULL,
	"max_occupancy_children" integer DEFAULT 1,
	"max_total_guests" integer DEFAULT 3 NOT NULL,
	"base_bed_type" "room_types_base_bed_type" DEFAULT 'queen',
	"extra_bed_available" boolean DEFAULT false,
	"extra_bed_cost" numeric(10, 2),
	"room_size_sqm" integer,
	"view_type" "room_types_view_type" DEFAULT 'city_view',
	"bathroom_type" "room_types_bathroom_type" DEFAULT 'private_ensuite',
	"smoking_allowed" boolean DEFAULT false,
	"base_price_per_night" numeric(12, 2) NOT NULL,
	"total_units_count" integer DEFAULT 1 NOT NULL,
	"amenities" jsonb,
	"photos" jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "room_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"room_type_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"room_number" varchar(20) NOT NULL,
	"floor_number" integer DEFAULT 1,
	"wing_or_building" varchar(50),
	"physical_status" "room_units_physical_status" DEFAULT 'clean',
	"current_occupancy_status" "room_units_current_occupancy_status" DEFAULT 'vacant',
	"active_booking_id" uuid,
	"clean_inspected_at" timestamp with time zone,
	"last_cleaned_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "vehicle_booking_extras" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_booking_id" uuid NOT NULL,
	"extra_type" "vehicle_booking_extras_extra_type" DEFAULT 'child_seat_infant',
	"name" varchar(100) NOT NULL,
	"daily_rate" numeric(8, 2) NOT NULL,
	"quantity" integer DEFAULT 1,
	"total_amount" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_reference" varchar(25) NOT NULL,
	"traveler_id" uuid,
	"provider_id" uuid NOT NULL,
	"vehicle_id" uuid,
	"driver_id" uuid,
	"rental_model" "vehicle_bookings_rental_model" DEFAULT 'self_drive',
	"service_type" "vehicle_bookings_service_type" DEFAULT 'self_drive_rental',
	"pickup_date_time" timestamp with time zone NOT NULL,
	"return_date_time" timestamp with time zone NOT NULL,
	"pickup_location_address" varchar(300) NOT NULL,
	"pickup_latitude" numeric(10, 7),
	"pickup_longitude" numeric(10, 7),
	"dropoff_location_address" varchar(300),
	"dropoff_latitude" numeric(10, 7),
	"dropoff_longitude" numeric(10, 7),
	"flight_number" varchar(20),
	"flight_eta" varchar(20),
	"passenger_count" integer DEFAULT 1,
	"booking_status" "vehicle_bookings_booking_status" DEFAULT 'pending_payment',
	"base_rental_amount" numeric(12, 2) NOT NULL,
	"extras_amount" numeric(10, 2) DEFAULT '0.00',
	"protection_plan_amount" numeric(10, 2) DEFAULT '0.00',
	"driver_allowance_amount" numeric(10, 2) DEFAULT '0.00',
	"tax_amount" numeric(10, 2) DEFAULT '0.00',
	"total_amount" numeric(12, 2) NOT NULL,
	"security_deposit_amount" numeric(10, 2) DEFAULT '0.00',
	"deposit_hold_status" "vehicle_bookings_deposit_hold_status" DEFAULT 'none',
	"commission_amount" numeric(10, 2) DEFAULT '0.00',
	"net_provider_amount" numeric(12, 2) DEFAULT '0.00',
	"payment_status" "vehicle_bookings_payment_status" DEFAULT 'pending',
	"otp_code" varchar(6),
	"qr_code" varchar(500),
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "vehicle_bookings_booking_reference_unique" UNIQUE("booking_reference")
);
--> statement-breakpoint
CREATE TABLE "vehicle_compliance_docs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"document_type" "vehicle_compliance_docs_document_type" DEFAULT 'registration_card',
	"document_number" varchar(100) NOT NULL,
	"issued_date" varchar(10),
	"expiry_date" varchar(10) NOT NULL,
	"document_file_url" varchar(500) NOT NULL,
	"verification_status" "vehicle_compliance_docs_verification_status" DEFAULT 'pending',
	"verified_by" uuid,
	"verified_at" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_extra_charges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_booking_id" uuid NOT NULL,
	"charge_type" "vehicle_extra_charges_charge_type" DEFAULT 'excess_km',
	"description" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"deduction_source" "vehicle_extra_charges_deduction_source" DEFAULT 'security_deposit',
	"proof_photo_urls" jsonb,
	"status" "vehicle_extra_charges_status" DEFAULT 'pending_review',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_inspections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_booking_id" uuid NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"inspection_type" "vehicle_inspections_inspection_type" DEFAULT 'pre_handover',
	"odometer_km" integer NOT NULL,
	"fuel_percent" integer DEFAULT 100 NOT NULL,
	"cng_pressure_bar" integer,
	"damage_markers" jsonb,
	"general_notes" text,
	"photo_urls" jsonb,
	"inspector_user_id" uuid,
	"customer_signature_url" varchar(500),
	"inspector_signature_url" varchar(500),
	"inspection_pdf_url" varchar(500),
	"inspected_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_maintenance_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"service_type" "vehicle_maintenance_logs_service_type" DEFAULT 'scheduled_periodic',
	"description" text NOT NULL,
	"odometer_at_service" integer NOT NULL,
	"service_cost" numeric(10, 2) NOT NULL,
	"service_provider_name" varchar(150),
	"invoice_pdf_url" varchar(500),
	"serviced_at" timestamp with time zone DEFAULT now() NOT NULL,
	"next_service_due_odometer" integer,
	"next_service_due_date" varchar(10),
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_pricing_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"rental_model" "vehicle_pricing_plans_rental_model" DEFAULT 'self_drive',
	"base_hourly_rate" numeric(10, 2),
	"base_daily_rate" numeric(10, 2) NOT NULL,
	"weekly_rate" numeric(10, 2),
	"deposit_amount" numeric(10, 2) DEFAULT '200.00',
	"free_km_per_day" integer DEFAULT 150,
	"excess_km_rate" numeric(8, 2) DEFAULT '0.25',
	"fuel_policy_code" "vehicle_pricing_plans_fuel_policy_code" DEFAULT 'full_to_full',
	"is_b2b_exclusive" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_protection_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_code" "vehicle_protection_plans_plan_code" DEFAULT 'collision_damage_waiver',
	"name" varchar(100) NOT NULL,
	"description" text,
	"daily_rate" numeric(8, 2) NOT NULL,
	"collision_deductible_amount" numeric(10, 2) DEFAULT '200.00',
	"theft_deductible_amount" numeric(10, 2) DEFAULT '0.00',
	"glass_tire_covered" boolean DEFAULT false,
	"roadside_assistance_covered" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_booking_id" uuid NOT NULL,
	"vehicle_id" uuid,
	"driver_id" uuid,
	"traveler_id" uuid,
	"overall_rating" integer DEFAULT 5 NOT NULL,
	"vehicle_condition_rating" integer DEFAULT 5,
	"driver_professionalism_rating" integer DEFAULT 5,
	"punctuality_rating" integer DEFAULT 5,
	"value_rating" integer DEFAULT 5,
	"review_text" text,
	"photo_urls" jsonb,
	"is_verified_rental" boolean DEFAULT true,
	"provider_response_text" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_transfer_routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"origin_name" varchar(150) NOT NULL,
	"origin_coordinates" varchar(50),
	"destination_name" varchar(150) NOT NULL,
	"destination_coordinates" varchar(50),
	"distance_km" numeric(8, 2),
	"estimated_duration_minutes" integer,
	"vehicle_category" "vehicle_transfer_routes_vehicle_category" DEFAULT 'economy_sedan',
	"fixed_fare_amount" numeric(10, 2) NOT NULL,
	"driver_allowance_amount" numeric(10, 2) DEFAULT '0.00',
	"toll_included" boolean DEFAULT true,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"registration_number" varchar(50) NOT NULL,
	"vin_number" varchar(50),
	"make" varchar(50) NOT NULL,
	"model" varchar(50) NOT NULL,
	"year" integer NOT NULL,
	"category" "vehicles_category" DEFAULT 'four_wheeler',
	"sub_category" "vehicles_sub_category" DEFAULT 'economy_sedan',
	"seating_capacity" integer DEFAULT 5 NOT NULL,
	"luggage_capacity_large" integer DEFAULT 2,
	"luggage_capacity_small" integer DEFAULT 2,
	"transmission" "vehicles_transmission" DEFAULT 'automatic',
	"fuel_type" "vehicles_fuel_type" DEFAULT 'petrol',
	"drive_train" "vehicles_drive_train" DEFAULT 'fwd',
	"color" varchar(40),
	"air_conditioning" "vehicles_air_conditioning" DEFAULT 'climate_control',
	"engine_displacement_cc" integer,
	"current_odometer_km" integer DEFAULT 0,
	"current_fuel_level_percent" integer DEFAULT 100,
	"cng_cylinder_test_expiry" varchar(10),
	"active_status" "vehicles_active_status" DEFAULT 'active',
	"is_available_for_rental" boolean DEFAULT true,
	"is_available_with_driver" boolean DEFAULT true,
	"current_location_address" varchar(300),
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"photos" jsonb,
	"features" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "vehicles_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
CREATE INDEX "drivers_provider_idx" ON "drivers" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "drivers_duty_idx" ON "drivers" USING btree ("duty_status");--> statement-breakpoint
CREATE INDEX "hotel_booking_rooms_booking_idx" ON "hotel_booking_rooms" USING btree ("hotel_booking_id");--> statement-breakpoint
CREATE INDEX "hotel_booking_rooms_unit_idx" ON "hotel_booking_rooms" USING btree ("room_unit_id");--> statement-breakpoint
CREATE INDEX "hotel_bookings_property_idx" ON "hotel_bookings" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "hotel_bookings_ref_idx" ON "hotel_bookings" USING btree ("booking_reference");--> statement-breakpoint
CREATE INDEX "hotel_bookings_status_idx" ON "hotel_bookings" USING btree ("booking_status");--> statement-breakpoint
CREATE INDEX "hotel_guest_folios_booking_idx" ON "hotel_guest_folios" USING btree ("hotel_booking_id");--> statement-breakpoint
CREATE INDEX "hotel_maintenance_tickets_property_idx" ON "hotel_maintenance_tickets" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "hotel_maintenance_tickets_status_idx" ON "hotel_maintenance_tickets" USING btree ("status");--> statement-breakpoint
CREATE INDEX "hotel_properties_provider_idx" ON "hotel_properties" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "hotel_properties_destination_idx" ON "hotel_properties" USING btree ("destination_id");--> statement-breakpoint
CREATE INDEX "hotel_properties_status_idx" ON "hotel_properties" USING btree ("status");--> statement-breakpoint
CREATE INDEX "hotel_reviews_property_idx" ON "hotel_reviews" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "hotel_reviews_booking_idx" ON "hotel_reviews" USING btree ("hotel_booking_id");--> statement-breakpoint
CREATE INDEX "hotel_upsell_conversions_booking_idx" ON "hotel_upsell_conversions" USING btree ("hotel_booking_id");--> statement-breakpoint
CREATE INDEX "hotel_upsell_offers_property_idx" ON "hotel_upsell_offers" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "inventory_calendar_date_idx" ON "inventory_calendar" USING btree ("room_type_id","calendar_date");--> statement-breakpoint
CREATE INDEX "property_amenities_property_idx" ON "property_amenities" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "rate_plans_room_type_idx" ON "rate_plans" USING btree ("room_type_id");--> statement-breakpoint
CREATE INDEX "rate_plans_property_idx" ON "rate_plans" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "room_types_property_idx" ON "room_types" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "room_types_category_idx" ON "room_types" USING btree ("category");--> statement-breakpoint
CREATE INDEX "room_units_property_idx" ON "room_units" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "room_units_type_idx" ON "room_units" USING btree ("room_type_id");--> statement-breakpoint
CREATE INDEX "vehicle_booking_extras_booking_idx" ON "vehicle_booking_extras" USING btree ("vehicle_booking_id");--> statement-breakpoint
CREATE INDEX "vehicle_bookings_ref_idx" ON "vehicle_bookings" USING btree ("booking_reference");--> statement-breakpoint
CREATE INDEX "vehicle_bookings_provider_idx" ON "vehicle_bookings" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "vehicle_bookings_status_idx" ON "vehicle_bookings" USING btree ("booking_status");--> statement-breakpoint
CREATE INDEX "vehicle_compliance_docs_vehicle_idx" ON "vehicle_compliance_docs" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicle_compliance_docs_expiry_idx" ON "vehicle_compliance_docs" USING btree ("expiry_date");--> statement-breakpoint
CREATE INDEX "vehicle_extra_charges_booking_idx" ON "vehicle_extra_charges" USING btree ("vehicle_booking_id");--> statement-breakpoint
CREATE INDEX "vehicle_inspections_booking_idx" ON "vehicle_inspections" USING btree ("vehicle_booking_id");--> statement-breakpoint
CREATE INDEX "vehicle_maintenance_logs_vehicle_idx" ON "vehicle_maintenance_logs" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicle_pricing_plans_vehicle_idx" ON "vehicle_pricing_plans" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicle_reviews_vehicle_idx" ON "vehicle_reviews" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicle_reviews_driver_idx" ON "vehicle_reviews" USING btree ("driver_id");--> statement-breakpoint
CREATE INDEX "vehicle_transfer_routes_provider_idx" ON "vehicle_transfer_routes" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "vehicles_provider_idx" ON "vehicles" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "vehicles_category_idx" ON "vehicles" USING btree ("category");--> statement-breakpoint
CREATE INDEX "vehicles_status_idx" ON "vehicles" USING btree ("active_status");