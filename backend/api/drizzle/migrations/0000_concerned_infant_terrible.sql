CREATE TYPE "public"."affiliate_accounts_status" AS ENUM('pending', 'active', 'suspended', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."amenities_category" AS ENUM('comfort', 'safety', 'accessibility', 'connectivity', 'catering', 'transport');--> statement-breakpoint
CREATE TYPE "public"."amenities_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."audit_logs_severity" AS ENUM('info', 'warning', 'critical');--> statement-breakpoint
CREATE TYPE "public"."blog_posts_status" AS ENUM('draft', 'published', 'scheduled', 'archived');--> statement-breakpoint
CREATE TYPE "public"."bookings_booking_status" AS ENUM('draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."bookings_checkin_status" AS ENUM('pending', 'checked_in', 'no_show');--> statement-breakpoint
CREATE TYPE "public"."categories_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."cms_pages_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."cms_pages_template_type" AS ENUM('static', 'landing', 'destination', 'campaign', 'legal', 'help', 'provider_info');--> statement-breakpoint
CREATE TYPE "public"."coupons_discount_type" AS ENUM('percentage', 'fixed');--> statement-breakpoint
CREATE TYPE "public"."coupons_funder" AS ENUM('marketplace', 'provider', 'shared');--> statement-breakpoint
CREATE TYPE "public"."coupons_status" AS ENUM('active', 'inactive', 'expired');--> statement-breakpoint
CREATE TYPE "public"."customer_wallets_status" AS ENUM('active', 'frozen');--> statement-breakpoint
CREATE TYPE "public"."departures_status" AS ENUM('available', 'limited', 'sold_out', 'on_request', 'closed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."destinations_status" AS ENUM('active', 'inactive', 'draft');--> statement-breakpoint
CREATE TYPE "public"."disputes_status" AS ENUM('open', 'awaiting_traveler', 'awaiting_provider', 'under_investigation', 'resolved_traveler', 'resolved_provider', 'partially_resolved', 'closed', 'escalated');--> statement-breakpoint
CREATE TYPE "public"."gift_cards_status" AS ENUM('active', 'redeemed', 'expired', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."guide_profiles_status" AS ENUM('active', 'inactive', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."kyc_documents_document_type" AS ENUM('trade_license', 'company_registration', 'tax_certificate', 'passport', 'national_id', 'bank_statement', 'insurance_certificate', 'guide_certification', 'proof_of_address');--> statement-breakpoint
CREATE TYPE "public"."kyc_documents_status" AS ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired');--> statement-breakpoint
CREATE TYPE "public"."ledger_entries_account_type" AS ENUM('customer_payment', 'provider_earning', 'platform_commission', 'service_fee', 'tax', 'gateway_fee', 'coupon_discount', 'wallet_credit', 'refund', 'chargeback', 'withdrawal', 'manual_adjustment');--> statement-breakpoint
CREATE TYPE "public"."ledger_entries_entry_type" AS ENUM('credit', 'debit');--> statement-breakpoint
CREATE TYPE "public"."ledger_entries_reference_type" AS ENUM('booking', 'transaction', 'withdrawal', 'refund', 'dispute', 'manual');--> statement-breakpoint
CREATE TYPE "public"."loyalty_accounts_tier" AS ENUM('bronze', 'silver', 'gold', 'platinum');--> statement-breakpoint
CREATE TYPE "public"."package_addons_pricing_type" AS ENUM('per_person', 'per_booking');--> statement-breakpoint
CREATE TYPE "public"."package_addons_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."packages_cancellation_policy" AS ENUM('flexible', 'moderate', 'strict', 'non_refundable');--> statement-breakpoint
CREATE TYPE "public"."packages_confirmation_type" AS ENUM('instant', 'request_to_book');--> statement-breakpoint
CREATE TYPE "public"."packages_difficulty_level" AS ENUM('easy', 'moderate', 'challenging', 'extreme');--> statement-breakpoint
CREATE TYPE "public"."packages_product_type" AS ENUM('fixed_tour', 'flexible_tour', 'private_tour', 'group_tour', 'activity', 'day_trip', 'multi_day_package', 'guided_city_tour', 'adventure_experience', 'cruise_boat', 'transfer_service', 'transport_rental', 'accommodation_package', 'custom_trip', 'event_package', 'ticket_pass', 'travel_product', 'package_addon');--> statement-breakpoint
CREATE TYPE "public"."packages_status" AS ENUM('draft', 'submitted', 'approved', 'published', 'unpublished', 'rejected', 'archived', 'suspended', 'expired');--> statement-breakpoint
CREATE TYPE "public"."payment_transactions_gateway" AS ENUM('stripe', 'bkash', 'sslcommerz', 'paypal', 'paygov', 'manual_transfer', 'wallet', 'gift_card');--> statement-breakpoint
CREATE TYPE "public"."payment_transactions_payment_mode" AS ENUM('platform_collection', 'direct_provider', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."payment_transactions_status" AS ENUM('pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."payment_transactions_transaction_type" AS ENUM('full_payment', 'deposit', 'installment', 'balance_payment', 'refund', 'chargeback_reversal');--> statement-breakpoint
CREATE TYPE "public"."price_rules_pricing_type" AS ENUM('per_person', 'per_adult', 'per_child', 'per_infant', 'per_senior', 'per_student', 'per_group', 'per_vehicle', 'per_room', 'per_hour', 'per_day');--> statement-breakpoint
CREATE TYPE "public"."price_rules_season_type" AS ENUM('standard', 'peak', 'off_peak', 'weekend', 'holiday', 'special_event');--> statement-breakpoint
CREATE TYPE "public"."price_rules_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."provider_payout_accounts_account_type" AS ENUM('bank_account', 'mobile_wallet', 'payment_gateway');--> statement-breakpoint
CREATE TYPE "public"."provider_payout_accounts_status" AS ENUM('active', 'inactive', 'pending_verification');--> statement-breakpoint
CREATE TYPE "public"."provider_quotations_status" AS ENUM('draft', 'submitted', 'accepted', 'rejected', 'expired', 'revoked');--> statement-breakpoint
CREATE TYPE "public"."provider_staff_role" AS ENUM('manager', 'finance', 'content', 'guide', 'custom');--> statement-breakpoint
CREATE TYPE "public"."provider_staff_status" AS ENUM('active', 'inactive', 'invited');--> statement-breakpoint
CREATE TYPE "public"."providers_approval_status" AS ENUM('pending', 'approved', 'rejected', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."providers_kyc_status" AS ENUM('not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired');--> statement-breakpoint
CREATE TYPE "public"."providers_provider_type" AS ENUM('agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host');--> statement-breakpoint
CREATE TYPE "public"."providers_risk_level" AS ENUM('low', 'medium', 'high', 'critical');--> statement-breakpoint
CREATE TYPE "public"."refund_requests_initiated_by" AS ENUM('traveler', 'provider', 'admin', 'system');--> statement-breakpoint
CREATE TYPE "public"."refund_requests_refund_method" AS ENUM('original_payment', 'wallet', 'bank_transfer', 'mixed');--> statement-breakpoint
CREATE TYPE "public"."refund_requests_status" AS ENUM('pending', 'approved', 'rejected', 'processing', 'processed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."review_responses_status" AS ENUM('published', 'hidden');--> statement-breakpoint
CREATE TYPE "public"."reviews_status" AS ENUM('submitted', 'published', 'flagged', 'hidden', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."support_tickets_priority" AS ENUM('low', 'medium', 'high', 'urgent');--> statement-breakpoint
CREATE TYPE "public"."support_tickets_status" AS ENUM('open', 'in_progress', 'awaiting_customer', 'awaiting_provider', 'resolved', 'closed');--> statement-breakpoint
CREATE TYPE "public"."ticket_messages_sender_type" AS ENUM('traveler', 'provider', 'agent', 'system');--> statement-breakpoint
CREATE TYPE "public"."trip_inquiries_status" AS ENUM('open', 'quoted', 'accepted', 'booked', 'expired', 'closed');--> statement-breakpoint
CREATE TYPE "public"."users_role" AS ENUM('super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate');--> statement-breakpoint
CREATE TYPE "public"."users_status" AS ENUM('active', 'suspended', 'banned', 'pending_verification');--> statement-breakpoint
CREATE TYPE "public"."waitlists_status" AS ENUM('waiting', 'offered', 'booked', 'expired', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_requests_status" AS ENUM('draft', 'submitted', 'under_review', 'approved', 'processing', 'paid', 'failed', 'rejected', 'cancelled', 'reversed');--> statement-breakpoint
CREATE TABLE "affiliate_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"referral_code" varchar(30) NOT NULL,
	"commission_rate" numeric(5, 2) NOT NULL,
	"total_clicks" integer DEFAULT 0,
	"total_bookings" integer DEFAULT 0,
	"total_commission_earned" numeric(12, 2) DEFAULT '0',
	"pending_payout" numeric(12, 2) DEFAULT '0',
	"currency" varchar(3) NOT NULL,
	"status" "affiliate_accounts_status" DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "affiliate_accounts_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "affiliate_accounts_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"icon" varchar(100),
	"category" "amenities_category" DEFAULT 'comfort',
	"status" "amenities_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"actor_role" varchar(100),
	"action" varchar(200) NOT NULL,
	"entity_type" varchar(100),
	"entity_id" uuid,
	"previous_state" jsonb,
	"new_state" jsonb,
	"ip_address" varchar(50),
	"user_agent" varchar(500),
	"correlation_id" varchar(100),
	"severity" "audit_logs_severity" DEFAULT 'info',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(350) NOT NULL,
	"excerpt" varchar(500),
	"content" text,
	"featured_image" varchar(500),
	"author_id" uuid,
	"destination_id" uuid,
	"categories" jsonb,
	"tags" jsonb,
	"status" "blog_posts_status" DEFAULT 'draft',
	"published_at" timestamp with time zone,
	"scheduled_at" timestamp with time zone,
	"meta_title" varchar(200),
	"meta_description" varchar(500),
	"language" varchar(10) NOT NULL,
	"view_count" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "booking_addon_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"addon_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "booking_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"date_of_birth" timestamp with time zone,
	"gender" varchar(20),
	"nationality" varchar(100),
	"passport_number" varchar(50),
	"passport_expiry" timestamp with time zone,
	"emergency_contact" jsonb,
	"dietary_requirements" varchar(500),
	"accessibility_requirements" varchar(500),
	"voluntary_medical_notes" text,
	"is_primary_contact" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_reference" varchar(20) NOT NULL,
	"traveler_id" uuid,
	"package_id" uuid NOT NULL,
	"departure_id" uuid,
	"guest_email" varchar(255),
	"guest_name" varchar(200),
	"participant_count" integer NOT NULL,
	"booking_status" "bookings_booking_status" DEFAULT 'draft',
	"total_amount" numeric(12, 2) NOT NULL,
	"base_amount" numeric(12, 2),
	"addon_amount" numeric(12, 2),
	"discount_amount" numeric(12, 2),
	"tax_amount" numeric(12, 2),
	"service_fee_amount" numeric(12, 2),
	"deposit_amount" numeric(12, 2),
	"paid_amount" numeric(12, 2),
	"balance_due" numeric(12, 2),
	"currency" varchar(3) NOT NULL,
	"display_currency" varchar(3),
	"exchange_rate" numeric(18, 8),
	"coupon_code" varchar(50),
	"wallet_credit_used" numeric(12, 2),
	"contact_name" varchar(200) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"contact_phone" varchar(30),
	"pickup_location" varchar(500),
	"special_requests" text,
	"qr_code" varchar(500),
	"voucher_url" varchar(500),
	"checkin_status" "bookings_checkin_status" DEFAULT 'pending',
	"checkin_time" timestamp with time zone,
	"inventory_locked_until" timestamp with time zone,
	"confirmed_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "bookings_booking_reference_unique" UNIQUE("booking_reference")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"slug" varchar(200) NOT NULL,
	"parent_id" uuid,
	"icon" varchar(100),
	"cover_image" varchar(500),
	"description" text,
	"sort_order" integer,
	"status" "categories_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cms_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(300) NOT NULL,
	"slug" varchar(350) NOT NULL,
	"content" text,
	"excerpt" varchar(500),
	"template_type" "cms_pages_template_type" DEFAULT 'static',
	"featured_image" varchar(500),
	"status" "cms_pages_status" DEFAULT 'draft',
	"published_at" timestamp with time zone,
	"scheduled_at" timestamp with time zone,
	"meta_title" varchar(200),
	"meta_description" varchar(500),
	"canonical_url" varchar(500),
	"language" varchar(10) NOT NULL,
	"author_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "cms_pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"discount_type" "coupons_discount_type" DEFAULT 'percentage',
	"discount_value" numeric(10, 2) NOT NULL,
	"currency" varchar(3),
	"min_booking_value" numeric(10, 2),
	"max_discount" numeric(10, 2),
	"provider_id" uuid,
	"starts_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"max_uses" integer,
	"used_count" integer DEFAULT 0,
	"max_uses_per_customer" integer,
	"is_first_booking_only" boolean DEFAULT false,
	"funder" "coupons_funder" DEFAULT 'marketplace',
	"status" "coupons_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "customer_wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"available_balance" numeric(12, 2) DEFAULT '0',
	"currency" varchar(3) NOT NULL,
	"status" "customer_wallets_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "customer_wallets_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "departures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"departure_code" varchar(50) NOT NULL,
	"start_datetime" timestamp with time zone NOT NULL,
	"end_datetime" timestamp with time zone,
	"capacity" integer NOT NULL,
	"booked_count" integer DEFAULT 0,
	"available_count" integer,
	"min_participants" integer,
	"assigned_guide_id" uuid,
	"price_override" numeric(12, 2),
	"booking_cutoff_hours" integer,
	"meeting_point" text,
	"internal_notes" text,
	"status" "departures_status" DEFAULT 'available',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "destinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"country" varchar(100) NOT NULL,
	"country_code" varchar(5),
	"state_region" varchar(150),
	"description" text,
	"travel_guide" text,
	"cover_image" varchar(500),
	"gallery" jsonb,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"weather_info" jsonb,
	"visa_info" text,
	"safety_info" text,
	"is_featured" boolean DEFAULT false,
	"sort_order" integer,
	"status" "destinations_status" DEFAULT 'draft',
	"meta_title" varchar(200),
	"meta_description" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "destinations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "disputes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"complainant_id" uuid NOT NULL,
	"reason" varchar(300) NOT NULL,
	"description" text,
	"evidence_urls" jsonb,
	"status" "disputes_status" DEFAULT 'open',
	"resolution_notes" text,
	"financial_adjustment" numeric(12, 2),
	"assigned_agent_id" uuid,
	"resolved_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "exchange_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_currency" varchar(3) NOT NULL,
	"to_currency" varchar(3) NOT NULL,
	"rate" numeric(18, 8) NOT NULL,
	"source" varchar(50),
	"effective_date" timestamp with time zone NOT NULL,
	"is_manual_override" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gift_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"initial_balance" numeric(10, 2) NOT NULL,
	"current_balance" numeric(10, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"purchaser_id" uuid,
	"recipient_email" varchar(255),
	"recipient_name" varchar(200),
	"personal_message" text,
	"delivery_date" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"status" "gift_cards_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "gift_cards_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "guide_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"user_id" uuid,
	"name" varchar(200) NOT NULL,
	"photo_url" varchar(500),
	"bio" text,
	"languages" jsonb,
	"certifications" jsonb,
	"specialties" jsonb,
	"rating" numeric(3, 2),
	"emergency_contact" jsonb,
	"is_available" boolean DEFAULT true,
	"status" "guide_profiles_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "itinerary_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"day_number" integer,
	"sequence_order" integer NOT NULL,
	"title" varchar(300) NOT NULL,
	"description" text,
	"start_time" varchar(10),
	"end_time" varchar(10),
	"location_name" varchar(300),
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"meals" jsonb,
	"accommodation" jsonb,
	"transport" jsonb,
	"included_items" jsonb,
	"optional_items" jsonb,
	"media_urls" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kyc_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"document_type" "kyc_documents_document_type" DEFAULT 'trade_license',
	"document_number" varchar(100),
	"file_url" varchar(500) NOT NULL,
	"file_name" varchar(255),
	"expiry_date" timestamp with time zone,
	"status" "kyc_documents_status" DEFAULT 'draft',
	"review_notes" text,
	"reviewed_by" uuid,
	"reviewed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "ledger_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entry_type" "ledger_entries_entry_type" DEFAULT 'credit',
	"account_type" "ledger_entries_account_type" DEFAULT 'customer_payment',
	"reference_type" "ledger_entries_reference_type" DEFAULT 'booking',
	"reference_id" uuid NOT NULL,
	"provider_id" uuid,
	"user_id" uuid,
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"balance_after" numeric(12, 2),
	"description" varchar(500),
	"recorded_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loyalty_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"points_balance" integer DEFAULT 0,
	"lifetime_earned" integer DEFAULT 0,
	"lifetime_redeemed" integer DEFAULT 0,
	"tier" "loyalty_accounts_tier" DEFAULT 'bronze',
	"tier_updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "loyalty_accounts_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "package_addons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"pricing_type" "package_addons_pricing_type" DEFAULT 'per_person',
	"max_quantity" integer,
	"is_required" boolean DEFAULT false,
	"status" "package_addons_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "package_faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"question" varchar(500) NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"category_id" uuid,
	"destination_id" uuid,
	"title" varchar(300) NOT NULL,
	"slug" varchar(350) NOT NULL,
	"short_description" varchar(500),
	"description" text,
	"product_type" "packages_product_type" DEFAULT 'fixed_tour',
	"duration_hours" integer,
	"duration_days" integer,
	"min_participants" integer,
	"max_participants" integer,
	"min_age" integer,
	"max_age" integer,
	"difficulty_level" "packages_difficulty_level" DEFAULT 'easy',
	"confirmation_type" "packages_confirmation_type" DEFAULT 'instant',
	"cancellation_policy" "packages_cancellation_policy" DEFAULT 'moderate',
	"cancellation_policy_details" text,
	"refund_policy" text,
	"terms" text,
	"base_price" numeric(12, 2),
	"currency" varchar(3) NOT NULL,
	"featured_image" varchar(500),
	"gallery" jsonb,
	"video_url" varchar(500),
	"brochure_url" varchar(500),
	"meeting_point" text,
	"meeting_latitude" numeric(10, 7),
	"meeting_longitude" numeric(10, 7),
	"departure_location" varchar(400),
	"return_location" varchar(400),
	"inclusions" jsonb,
	"exclusions" jsonb,
	"amenities" jsonb,
	"languages" jsonb,
	"accessibility_info" text,
	"physical_requirements" text,
	"tags" jsonb,
	"search_keywords" text,
	"is_featured" boolean DEFAULT false,
	"rating" numeric(3, 2),
	"review_count" integer DEFAULT 0,
	"total_bookings" integer DEFAULT 0,
	"status" "packages_status" DEFAULT 'draft',
	"rejection_reason" text,
	"moderation_notes" text,
	"meta_title" varchar(200),
	"meta_description" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "packages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "payment_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"gateway" "payment_transactions_gateway" DEFAULT 'stripe',
	"payment_mode" "payment_transactions_payment_mode" DEFAULT 'platform_collection',
	"transaction_type" "payment_transactions_transaction_type" DEFAULT 'full_payment',
	"transaction_reference" varchar(200),
	"gateway_transaction_id" varchar(200),
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"status" "payment_transactions_status" DEFAULT 'pending',
	"failure_reason" varchar(500),
	"gateway_response" jsonb,
	"idempotency_key" varchar(100),
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "price_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"departure_id" uuid,
	"pricing_type" "price_rules_pricing_type" DEFAULT 'per_person',
	"tier_min" integer,
	"tier_max" integer,
	"season_type" "price_rules_season_type" DEFAULT 'standard',
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"price" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"status" "price_rules_status" DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_payout_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"account_type" "provider_payout_accounts_account_type" DEFAULT 'bank_account',
	"provider_name" varchar(150) NOT NULL,
	"account_number" varchar(100) NOT NULL,
	"account_name" varchar(200) NOT NULL,
	"routing_number" varchar(50),
	"bank_name" varchar(200),
	"branch_code" varchar(50),
	"country" varchar(100) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"is_default" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,
	"status" "provider_payout_accounts_status" DEFAULT 'pending_verification',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "provider_quotations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inquiry_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"itinerary_details" jsonb,
	"inclusions" jsonb,
	"exclusions" jsonb,
	"total_price" numeric(12, 2) NOT NULL,
	"currency" varchar(3) NOT NULL,
	"deposit_amount" numeric(12, 2),
	"terms" text,
	"valid_until" timestamp with time zone NOT NULL,
	"status" "provider_quotations_status" DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "provider_staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "provider_staff_role" DEFAULT 'manager',
	"permissions" jsonb,
	"status" "provider_staff_status" DEFAULT 'invited',
	"invited_at" timestamp with time zone,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provider_wallets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"pending_balance" numeric(12, 2) DEFAULT '0',
	"available_balance" numeric(12, 2) DEFAULT '0',
	"reserved_balance" numeric(12, 2) DEFAULT '0',
	"withdrawn_balance" numeric(12, 2) DEFAULT '0',
	"negative_balance" numeric(12, 2) DEFAULT '0',
	"currency" varchar(3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "provider_wallets_provider_id_unique" UNIQUE("provider_id")
);
--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"legal_name" varchar(255) NOT NULL,
	"display_name" varchar(200) NOT NULL,
	"slug" varchar(250) NOT NULL,
	"provider_type" "providers_provider_type" DEFAULT 'tour_operator',
	"registration_number" varchar(100),
	"tax_id" varchar(100),
	"country" varchar(100) NOT NULL,
	"address" text,
	"contact_email" varchar(255) NOT NULL,
	"contact_phone" varchar(30),
	"website" varchar(500),
	"logo_url" varchar(500),
	"cover_image" varchar(500),
	"description" text,
	"languages" jsonb,
	"operating_destinations" jsonb,
	"social_links" jsonb,
	"certifications" jsonb,
	"commission_rate" numeric(5, 2),
	"kyc_status" "providers_kyc_status" DEFAULT 'not_submitted',
	"approval_status" "providers_approval_status" DEFAULT 'pending',
	"rating" numeric(3, 2),
	"total_bookings" integer DEFAULT 0,
	"verified_badge" boolean DEFAULT false,
	"is_withdrawal_restricted" boolean DEFAULT false,
	"risk_level" "providers_risk_level" DEFAULT 'low',
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "providers_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "refund_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"initiated_by" "refund_requests_initiated_by" DEFAULT 'traveler',
	"reason" varchar(500) NOT NULL,
	"description" text,
	"requested_amount" numeric(12, 2) NOT NULL,
	"approved_amount" numeric(12, 2),
	"cancellation_fee" numeric(12, 2),
	"refund_method" "refund_requests_refund_method" DEFAULT 'original_payment',
	"status" "refund_requests_status" DEFAULT 'pending',
	"review_notes" text,
	"reviewed_by" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "review_responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"review_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"response_text" text NOT NULL,
	"status" "review_responses_status" DEFAULT 'published',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "review_responses_review_id_unique" UNIQUE("review_id")
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"booking_id" uuid NOT NULL,
	"package_id" uuid NOT NULL,
	"provider_id" uuid NOT NULL,
	"traveler_id" uuid NOT NULL,
	"overall_rating" integer NOT NULL,
	"package_rating" integer,
	"provider_rating" integer,
	"guide_rating" integer,
	"value_rating" integer,
	"service_rating" integer,
	"title" varchar(300),
	"content" text,
	"photos" jsonb,
	"is_verified_booking" boolean DEFAULT true,
	"status" "reviews_status" DEFAULT 'submitted',
	"moderation_notes" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "support_tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_number" varchar(20) NOT NULL,
	"user_id" uuid,
	"provider_id" uuid,
	"booking_id" uuid,
	"subject" varchar(300) NOT NULL,
	"description" text,
	"priority" "support_tickets_priority" DEFAULT 'medium',
	"category" varchar(100),
	"status" "support_tickets_status" DEFAULT 'open',
	"assigned_agent_id" uuid,
	"sl_deadline" timestamp with time zone,
	"resolved_at" timestamp with time zone,
	"satisfaction_rating" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "support_tickets_ticket_number_unique" UNIQUE("ticket_number")
);
--> statement-breakpoint
CREATE TABLE "ticket_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticket_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"sender_type" "ticket_messages_sender_type" DEFAULT 'traveler',
	"message" text NOT NULL,
	"attachments" jsonb,
	"is_internal_note" boolean DEFAULT false,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "trip_inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"traveler_id" uuid,
	"destination_id" uuid,
	"contact_email" varchar(255) NOT NULL,
	"contact_name" varchar(200) NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"traveler_count" integer,
	"estimated_budget" numeric(12, 2),
	"budget_currency" varchar(3),
	"preferences" jsonb,
	"special_requests" text,
	"status" "trip_inquiries_status" DEFAULT 'open',
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"password_hash" varchar(255),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"role" "users_role" DEFAULT 'traveler',
	"avatar_url" varchar(500),
	"is_email_verified" boolean DEFAULT false,
	"is_phone_verified" boolean DEFAULT false,
	"status" "users_status" DEFAULT 'pending_verification',
	"last_login_at" timestamp with time zone,
	"timezone" varchar(50),
	"preferred_currency" varchar(3),
	"preferred_language" varchar(10),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "waitlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"departure_id" uuid NOT NULL,
	"user_id" uuid,
	"traveler_email" varchar(255) NOT NULL,
	"traveler_name" varchar(200) NOT NULL,
	"requested_seats" integer NOT NULL,
	"status" "waitlists_status" DEFAULT 'waiting',
	"offer_expires_at" timestamp with time zone,
	"notified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "withdrawal_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" uuid NOT NULL,
	"payout_account_id" uuid NOT NULL,
	"requested_amount" numeric(12, 2) NOT NULL,
	"fee_amount" numeric(12, 2),
	"net_amount" numeric(12, 2),
	"currency" varchar(3) NOT NULL,
	"status" "withdrawal_requests_status" DEFAULT 'draft',
	"payout_method" varchar(100),
	"transaction_reference" varchar(200),
	"provider_notes" text,
	"admin_notes" text,
	"reviewed_by" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "affiliate_accounts_user_unique_idx" ON "affiliate_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "affiliate_accounts_code_unique_idx" ON "affiliate_accounts" USING btree ("referral_code");--> statement-breakpoint
CREATE INDEX "affiliate_accounts_status_idx" ON "affiliate_accounts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "amenities_category_idx" ON "amenities" USING btree ("category","status");--> statement-breakpoint
CREATE INDEX "audit_logs_actor_idx" ON "audit_logs" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_logs_severity_idx" ON "audit_logs" USING btree ("severity");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_unique_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_status_idx" ON "blog_posts" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "blog_posts_destination_idx" ON "blog_posts" USING btree ("destination_id","status");--> statement-breakpoint
CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "booking_addon_items_booking_idx" ON "booking_addon_items" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "booking_participants_booking_idx" ON "booking_participants" USING btree ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "bookings_reference_unique_idx" ON "bookings" USING btree ("booking_reference");--> statement-breakpoint
CREATE INDEX "bookings_traveler_status_idx" ON "bookings" USING btree ("traveler_id","booking_status");--> statement-breakpoint
CREATE INDEX "bookings_package_idx" ON "bookings" USING btree ("package_id","booking_status");--> statement-breakpoint
CREATE INDEX "bookings_departure_idx" ON "bookings" USING btree ("departure_id","booking_status");--> statement-breakpoint
CREATE INDEX "bookings_status_idx" ON "bookings" USING btree ("booking_status");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "cms_pages_slug_unique_idx" ON "cms_pages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "cms_pages_status_idx" ON "cms_pages" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "cms_pages_type_idx" ON "cms_pages" USING btree ("template_type","status");--> statement-breakpoint
CREATE UNIQUE INDEX "coupons_code_unique_idx" ON "coupons" USING btree ("code");--> statement-breakpoint
CREATE INDEX "coupons_status_expires_idx" ON "coupons" USING btree ("status","expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "customer_wallets_user_unique_idx" ON "customer_wallets" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "departures_package_status_idx" ON "departures" USING btree ("package_id","status");--> statement-breakpoint
CREATE INDEX "departures_start_date_idx" ON "departures" USING btree ("start_datetime","status");--> statement-breakpoint
CREATE INDEX "departures_code_idx" ON "departures" USING btree ("departure_code");--> statement-breakpoint
CREATE UNIQUE INDEX "destinations_slug_unique_idx" ON "destinations" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "destinations_country_status_idx" ON "destinations" USING btree ("country","status");--> statement-breakpoint
CREATE INDEX "destinations_featured_idx" ON "destinations" USING btree ("is_featured","status");--> statement-breakpoint
CREATE INDEX "disputes_booking_idx" ON "disputes" USING btree ("booking_id");--> statement-breakpoint
CREATE INDEX "disputes_status_idx" ON "disputes" USING btree ("status");--> statement-breakpoint
CREATE INDEX "disputes_agent_idx" ON "disputes" USING btree ("assigned_agent_id","status");--> statement-breakpoint
CREATE INDEX "exchange_rates_pair_idx" ON "exchange_rates" USING btree ("from_currency","to_currency");--> statement-breakpoint
CREATE INDEX "exchange_rates_date_idx" ON "exchange_rates" USING btree ("effective_date");--> statement-breakpoint
CREATE UNIQUE INDEX "gift_cards_code_unique_idx" ON "gift_cards" USING btree ("code");--> statement-breakpoint
CREATE INDEX "gift_cards_status_idx" ON "gift_cards" USING btree ("status","expires_at");--> statement-breakpoint
CREATE INDEX "guide_profiles_provider_idx" ON "guide_profiles" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "guide_profiles_user_idx" ON "guide_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "itinerary_package_day_idx" ON "itinerary_items" USING btree ("package_id","day_number");--> statement-breakpoint
CREATE INDEX "itinerary_package_seq_idx" ON "itinerary_items" USING btree ("package_id","sequence_order");--> statement-breakpoint
CREATE INDEX "kyc_documents_provider_idx" ON "kyc_documents" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "kyc_documents_type_idx" ON "kyc_documents" USING btree ("document_type","status");--> statement-breakpoint
CREATE INDEX "ledger_entries_provider_idx" ON "ledger_entries" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "ledger_entries_user_idx" ON "ledger_entries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ledger_entries_reference_idx" ON "ledger_entries" USING btree ("reference_type","reference_id");--> statement-breakpoint
CREATE INDEX "ledger_entries_account_type_idx" ON "ledger_entries" USING btree ("account_type");--> statement-breakpoint
CREATE UNIQUE INDEX "loyalty_accounts_user_unique_idx" ON "loyalty_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "loyalty_accounts_tier_idx" ON "loyalty_accounts" USING btree ("tier");--> statement-breakpoint
CREATE INDEX "package_addons_package_idx" ON "package_addons" USING btree ("package_id","status");--> statement-breakpoint
CREATE INDEX "package_faqs_package_idx" ON "package_faqs" USING btree ("package_id");--> statement-breakpoint
CREATE INDEX "packages_provider_status_idx" ON "packages" USING btree ("provider_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "packages_slug_unique_idx" ON "packages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "packages_destination_idx" ON "packages" USING btree ("destination_id","status");--> statement-breakpoint
CREATE INDEX "packages_category_idx" ON "packages" USING btree ("category_id","status");--> statement-breakpoint
CREATE INDEX "packages_featured_idx" ON "packages" USING btree ("is_featured","status");--> statement-breakpoint
CREATE INDEX "packages_type_idx" ON "packages" USING btree ("product_type","status");--> statement-breakpoint
CREATE INDEX "payment_transactions_booking_idx" ON "payment_transactions" USING btree ("booking_id","status");--> statement-breakpoint
CREATE INDEX "payment_transactions_gateway_ref_idx" ON "payment_transactions" USING btree ("gateway","transaction_reference");--> statement-breakpoint
CREATE INDEX "payment_transactions_status_idx" ON "payment_transactions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "price_rules_package_idx" ON "price_rules" USING btree ("package_id","status");--> statement-breakpoint
CREATE INDEX "price_rules_departure_idx" ON "price_rules" USING btree ("departure_id","status");--> statement-breakpoint
CREATE INDEX "price_rules_season_idx" ON "price_rules" USING btree ("season_type","start_date","end_date");--> statement-breakpoint
CREATE INDEX "payout_accounts_provider_idx" ON "provider_payout_accounts" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "payout_accounts_default_idx" ON "provider_payout_accounts" USING btree ("provider_id","is_default");--> statement-breakpoint
CREATE INDEX "provider_quotations_inquiry_idx" ON "provider_quotations" USING btree ("inquiry_id","status");--> statement-breakpoint
CREATE INDEX "provider_quotations_provider_idx" ON "provider_quotations" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "provider_staff_provider_idx" ON "provider_staff" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "provider_staff_user_idx" ON "provider_staff" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "provider_wallets_provider_unique_idx" ON "provider_wallets" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "providers_owner_idx" ON "providers" USING btree ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX "providers_slug_unique_idx" ON "providers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "providers_approval_kyc_idx" ON "providers" USING btree ("approval_status","kyc_status");--> statement-breakpoint
CREATE INDEX "providers_type_country_idx" ON "providers" USING btree ("provider_type","country");--> statement-breakpoint
CREATE INDEX "refund_requests_booking_idx" ON "refund_requests" USING btree ("booking_id","status");--> statement-breakpoint
CREATE INDEX "refund_requests_status_idx" ON "refund_requests" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "review_responses_review_unique_idx" ON "review_responses" USING btree ("review_id");--> statement-breakpoint
CREATE INDEX "review_responses_provider_idx" ON "review_responses" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "reviews_package_status_idx" ON "reviews" USING btree ("package_id","status");--> statement-breakpoint
CREATE INDEX "reviews_provider_status_idx" ON "reviews" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "reviews_traveler_idx" ON "reviews" USING btree ("traveler_id");--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_booking_unique_idx" ON "reviews" USING btree ("booking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "support_tickets_number_unique_idx" ON "support_tickets" USING btree ("ticket_number");--> statement-breakpoint
CREATE INDEX "support_tickets_user_status_idx" ON "support_tickets" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "support_tickets_status_priority_idx" ON "support_tickets" USING btree ("status","priority");--> statement-breakpoint
CREATE INDEX "support_tickets_agent_idx" ON "support_tickets" USING btree ("assigned_agent_id","status");--> statement-breakpoint
CREATE INDEX "ticket_messages_ticket_idx" ON "ticket_messages" USING btree ("ticket_id");--> statement-breakpoint
CREATE INDEX "ticket_messages_sender_idx" ON "ticket_messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "trip_inquiries_traveler_idx" ON "trip_inquiries" USING btree ("traveler_id","status");--> statement-breakpoint
CREATE INDEX "trip_inquiries_status_idx" ON "trip_inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "trip_inquiries_destination_idx" ON "trip_inquiries" USING btree ("destination_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_status_idx" ON "users" USING btree ("role","status");--> statement-breakpoint
CREATE INDEX "waitlist_departure_idx" ON "waitlists" USING btree ("departure_id","status");--> statement-breakpoint
CREATE INDEX "waitlist_user_idx" ON "waitlists" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "withdrawal_requests_provider_status_idx" ON "withdrawal_requests" USING btree ("provider_id","status");--> statement-breakpoint
CREATE INDEX "withdrawal_requests_status_idx" ON "withdrawal_requests" USING btree ("status");