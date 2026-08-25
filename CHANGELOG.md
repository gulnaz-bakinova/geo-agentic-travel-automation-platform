# Changelog

All notable changes to the MORN.KZ platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-08-20

### 🚀 First Production Release: AI-Native Platform

#### Added
- **`llms.txt`** and **`llms-full.txt`** endpoints following the [llmstxt.org](https://llmstxt.org) standard
- **`ai-catalog.json`** — OpenAPI-style action manifest for autonomous browser agents (OpenAI Operator, Claude Computer Use)
- **Schema.org JSON-LD graph** in `<head>`: `TouristTrip`, `Person`, `Offer`, `TravelAgency`, `FAQPage` entities
- **`data-agent-*` DOM attributes** on booking and transfer modals for deterministic agent execution
- **`robots.txt`** with explicit whitelist for GPTBot, PerplexityBot, ClaudeBot, Google-Extended
- Agentic CI/CD guardrails: `geo_optimizer`, `add_product`, `review_kirill` sub-agents in `.agents/skills`
- Mandatory AST syntax gate (`node -c app.js`) blocking commits with broken JavaScript

---

## [0.7.0] — 2026-08-12

### Added
- Review widget with social proof (`tour_reviews` table in Supabase)
- Star ratings and testimonial cards on tour landing pages

---

## [0.6.0] — 2026-08-05

### Added
- **Telegram Dispatch Engine**: PL/pgSQL triggers on `public.bookings` and `public.tour_requests`
- Automatic lead routing to certified guide chats via Telegram Bot API
- `telegram-webhook` Supabase Edge Function with HTML escaping and phone number masking
- `notification_templates` table for dynamic message templating

---

## [0.5.0] — 2026-07-28

### Added
- **Co-Sharing feature**: `cosharing_listings` and `cosharing_messages` tables
- Self-deleting listings 12 hours after departure time
- Peer-to-peer chat within listings for participant coordination
- Dynamic cost splitting when new participants join an open expedition

---

## [0.4.0] — 2026-07-20

### Added
- **Partner Affiliate System**: `partners`, `partner_clicks`, `tour_guides` tables
- Integration with certified partners: Powder Nomads, Monte Club, Chobota
- Commission tracking and referral link attribution
- Multi-tenant Row-Level Security (RLS) isolating partner data

---

## [0.3.0] — 2026-07-14

### Added
- **Helicopter Transfer** service: Eurocopter EC130 B4, Bell 505 fleet
- `transfer_orders` table with pricing per flight corridor (Boraldai)
- Order Transfer modal with GDPR consent checkbox
- Payment status tracking (`статус оплачено`)

---

## [0.2.0] — 2026-07-08

### Added
- **Legal Compliance Suite**: `/privacy-policy.html`, `/personal-data-consent.html`, `/public-offer.html`
- Kazakhstan Law No. 94-V and GDPR data minimization compliance
- Mandatory consent checkbox on all data-collection forms
- FAQ section with straight answers on 0% markup policy

---

## [0.1.0] — 2026-07-01

### Added
- Initial MVP: static site with tour catalog (Big Almaty Peak, Titov Mountain, and more)
- Responsive mobile-first design with parallax hero
- Multi-language support (EN / RU / KK)
- Booking request modal with direct guide routing
- Kaspi Pay deep-link integration for zero-markup direct settlement
- Supabase PostgreSQL backend with initial `tours` and `tour_requests`
