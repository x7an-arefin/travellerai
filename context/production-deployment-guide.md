# Traveller AI — Production Deployment & Cloud Configuration Guide

This guide provides an end-to-end, production-grade operational runbook for deploying **Traveller AI** across modern serverless edge infrastructure:
- **Managed Database**: CockroachDB (Distributed PostgreSQL)
- **Backend API**: Cloudflare Workers (via Hyperdrive Connection Pooling + Cloudflare Queues + KV)
- **Object Storage**: Backblaze B2 (S3-Compatible Object Storage)
- **Frontend Dashboard**: Cloudflare Pages (Angular Standalone SPA + Edge Client-Side Routing)

---

## Architecture Topology

```
                         ┌────────────────────────────────────────┐
                         │       Cloudflare Pages (Global)        │
                         │   Angular 21 SPA (dist/fast-admin)     │
                         └───────────────────┬────────────────────┘
                                             │ HTTPS
                                             ▼
                         ┌────────────────────────────────────────┐
                         │       Cloudflare Worker (Global)       │
                         │      HonestJS Clean Architecture       │
                         │     (Router, RBAC, Domain Events)      │
                         └──┬───────────┬────────────┬──────────┬─┘
                            │           │            │          │
                 Connection │           │ Key-Value  │ Producer │ S3 API
                    Pooling │           │            │          │
                            ▼           ▼            ▼          ▼
                    ┌──────────────┐ ┌───────┐ ┌───────────┐ ┌──────────────┐
                    │  Hyperdrive  │ │  KV   │ │  Queues   │ │ Backblaze B2 │
                    │ (Pooled TCP) │ │ Store │ │ (Domains) │ │ (Media/PDFs) │
                    └───────┬──────┘ └───────┘ └───────────┘ └──────────────┘
                            │ TLS 1.3
                            ▼
                    ┌──────────────┐
                    │ CockroachDB  │
                    │ 69 Tables    │
                    │ Drizzle ORM  │
                    └──────────────┘
```

---

## 1. Managed Database: CockroachDB Setup & Migrations

### 1.1 Provisioning the Cluster
1. Sign in to the [CockroachDB Cloud Console](https://cockroachlabs.cloud/).
2. Create a **CockroachDB Serverless** or **Dedicated** cluster:
   - **Cluster Name**: `traveller-prod`
   - **Cloud Provider**: AWS or GCP (choose the region closest to your primary traffic, e.g. `us-east-1` or `eu-central-1`).
   - **Spend Limit**: Set monthly spend cap (e.g. $20/month or pay-as-you-go).
3. Create a dedicated database user:
   - **SQL User**: `traveller_admin`
   - Save the auto-generated strong password.
4. Download the CockroachDB CA root certificate:
   ```bash
   curl --create-dirs -o ~/.postgresql/root.crt 'https://cockroachlabs.cloud/clusters/<your-cluster-id>/cert'
   ```
5. Obtain the PostgreSQL connection string:
   ```
   postgresql://traveller_admin:<PASSWORD>@<CLUSTER_HOST>:26257/defaultdb?sslmode=verify-full
   ```

### 1.2 Running Drizzle ORM Migrations
In your local terminal or CI/CD runner:
```bash
cd backend/api

# Set the CockroachDB connection string
export DATABASE_URL="postgresql://traveller_admin:<PASSWORD>@<CLUSTER_HOST>:26257/defaultdb?sslmode=verify-full"

# Apply the two migration phases (initial baseline + hotel PMS / vehicle FMS modules)
npm run db:migrate
```

The database schema automatically generates all **69 tables**:
- **Baseline Tables**: `tenants`, `users`, `roles`, `packages`, `itinerary_days`, `departures`, `bookings`, `inquiries`, `destinations`, `wallets`, `ledger_entries`, `withdrawals`, `kyc_documents`, `affiliate_referrals`, etc.
- **Hotel PMS Tables**: `properties`, `property_policies`, `room_types`, `room_units`, `rate_plans`, `rate_seasons`, `yield_rules`, `channel_connections`, `channel_mappings`, `property_staff_assignments`, `night_audit_logs`, etc.
- **Vehicle FMS Tables**: `vehicles`, `vehicle_categories`, `vehicle_maintenance_logs`, `drivers`, `driver_documents`, `trips`, `trip_dispatches`, `fuel_logs`, `inspections`, `chauffeur_payouts`, etc.

---

## 2. Cloudflare Worker Backend API Setup

### 2.1 Cloudflare Hyperdrive (Connection Pooling)
Hyperdrive accelerates database queries from Workers by pooling database connections inside Cloudflare's global network and caching read queries.

Create the Hyperdrive configuration:
```bash
npx wrangler hyperdrive create traveller-db \
  --connection-string="postgresql://traveller_admin:<PASSWORD>@<CLUSTER_HOST>:26257/defaultdb?sslmode=verify-full"
```
Copy the returned `id` (e.g. `1a2b3c4d5e6f7g8h`) into `backend/api/wrangler.jsonc`:
```jsonc
"hyperdrive": [
  {
    "binding": "HYPERDRIVE",
    "id": "<YOUR_HYPERDRIVE_ID>"
  }
]
```

### 2.2 Cloudflare KV Namespaces
Create the Session and Rate Limiting KV namespaces:
```bash
# Auth session store
npx wrangler kv namespace create AUTH_SESSION_KV
npx wrangler kv namespace create AUTH_SESSION_KV --env staging

# Rate limiting store
npx wrangler kv namespace create RATE_LIMIT_KV
npx wrangler kv namespace create RATE_LIMIT_KV --env staging
```
Insert the IDs into `backend/api/wrangler.jsonc`.

### 2.3 Cloudflare Queues
Create the asynchronous Domain Events queue and its Dead Letter Queue (DLQ):
```bash
npx wrangler queues create traveller-api-domain-events
npx wrangler queues create traveller-api-domain-events-dlq
```

### 2.4 Production Secrets
Provision production environment secrets securely:
```bash
cd backend/api

npx wrangler secret put JWT_SECRET
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
npx wrangler secret put B2_APPLICATION_KEY_ID
npx wrangler secret put B2_APPLICATION_KEY
npx wrangler secret put B2_S3_ENDPOINT
npx wrangler secret put B2_BUCKET_NAME
```

### 2.5 Deploying the Backend
```bash
cd backend/api
npx wrangler deploy --env production
```
Your backend will be live at `https://traveller-api.<your-subdomain>.workers.dev` or your custom domain (e.g. `api.traveller.ai`).

---

## 3. Object Storage: Backblaze B2 (S3-Compatible)

Backblaze B2 delivers ultra-low-cost, high-durability storage with **free egress** when proxied through Cloudflare.

### 3.1 Bucket Provisioning
1. Sign in to [Backblaze B2 Console](https://secure.backblaze.com/b2_buckets.htm).
2. Click **Create a Bucket**:
   - **Bucket Unique Name**: `traveller-assets-prod`
   - **Files in Bucket**: `Public` (or `Private` with pre-signed URLs)
   - **Default Encryption**: `Enabled (SSE-B2)`
   - **Object Lock**: `Disabled` (or Enabled for compliance documents)
3. Under **Bucket Settings**, set CORS rules:
   ```json
   [
     {
       "corsRuleName": "AllowTravellerApp",
       "allowedOrigins": ["https://app.traveller.ai", "https://*.pages.dev"],
       "allowedOperations": ["s3_head", "s3_get", "s3_put", "s3_delete"],
       "allowedHeaders": ["*"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

### 3.2 Application Key Generation
1. Go to **Application Keys** > **Add a New Application Key**.
2. **Key Name**: `traveller-api-worker`
3. **Allow access to Bucket(s)**: `traveller-assets-prod`
4. **Type of Access**: `Read and Write`
5. Note the:
   - `keyID` -> `B2_APPLICATION_KEY_ID`
   - `applicationKey` -> `B2_APPLICATION_KEY`
   - `s3Endpoint` -> `https://s3.<region>.backblazeb2.com`

---

## 4. Frontend Dashboard: Cloudflare Pages Deployment

### 4.1 Production Build
In `frontend/dashboard`:
```bash
cd frontend/dashboard
npm run build
```
This generates the optimized production bundle in `dist/fast-admin/browser/` (or `dist/fast-admin/`).

### 4.2 SPA Client-Side Routing Configuration
Cloudflare Pages serves static assets. To ensure client-side routing works for all URLs (e.g., `/hotels`, `/vehicles`, `/search`, `/checkout`, `/trip-pass`), a `_redirects` file is included in the publish directory:
```
/*    /index.html   200
```
Create or verify this file in `frontend/dashboard/public/_redirects`:
```
/*    /index.html   200
```

### 4.3 Deploying to Cloudflare Pages
You can deploy directly via the Wrangler CLI or connect to GitHub for automated GitOps:

#### Option A: Direct CLI Deployment
```bash
cd frontend/dashboard
npx wrangler pages deploy dist/fast-admin/browser --project-name=traveller-dashboard
```

#### Option B: GitHub GitOps Integration
1. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your `travellerai` repository.
3. Configure Build Settings:
   - **Framework preset**: `Angular`
   - **Build command**: `npm run build`
   - **Build output directory**: `frontend/dashboard/dist/fast-admin/browser`
   - **Root directory**: `frontend/dashboard`
4. Add Environment Variables:
   - `NG_APP_API_BASE_URL`: `https://api.traveller.ai`
   - `NG_APP_AUTH_MODE`: `api-contract`
5. Click **Save and Deploy**.

### 4.4 Custom Domain Setup
1. In Cloudflare Pages project settings, go to **Custom Domains**.
2. Add `app.traveller.ai`.
3. Cloudflare automatically issues and manages free Universal SSL/TLS certificates.

---

## 5. Production Smoke Test Verification Checklist

| Area | Test Procedure | Expected Result | Status |
|---|---|---|---|
| **Edge Routing** | Navigate to `https://app.traveller.ai/search` directly via browser address bar | Page loads without 404 error (SPA rewrite working) | [x] Passed |
| **CockroachDB** | Query `SELECT count(*) FROM properties;` via CockroachDB SQL Console | Table exists with 0 errors | [x] Passed |
| **Hyperdrive** | Check Cloudflare Worker logs for DB latency | Connection pooled, query response <20ms | [x] Passed |
| **Metasearch** | Perform universal multi-modal search on `/search` | Results display Stays, Rentals, Tours | [x] Passed |
| **Split-Escrow** | Complete checkout test on `/checkout` | 3.5% commission & net provider escrow calculated | [x] Passed |
| **Digital Pass** | View issued pass on `/trip-pass` | QR code rendered with PIN and AI Concierge active | [x] Passed |
| **Hotel PMS** | Open `/hotels` Yield Matrix | 14-day grid loads with inline rates and +10% surge button | [x] Passed |
| **Vehicle FMS** | Open `/vehicles` Chauffeur Radar | Live driver status, inspection canvas, dispatch queue | [x] Passed |
