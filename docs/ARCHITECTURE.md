# System Architecture Deep Dive

### Dual-Layer AI-Native Web Architecture, Agentic Protocols, and Event-Driven Pipelines

---

## 1. Architectural Philosophy & Principles

Traditional web applications are built exclusively for human optical rendering through web browsers. In the era of Generative AI and Autonomous Agentic Browsing (Perplexity, OpenAI Operator, Claude Computer Use, Google Gemini), web systems must operate with **dual-layer native capability**:

1. **Human-Centric Experience:** Ultra-fast, responsive, aesthetically engaging client runtime with sub-50ms First Contentful Paint (FCP) and zero framework bloat.
2. **Machine-Centric Execution Layer:** Deterministic, self-describing, and structured knowledge endpoints (`llms.txt`, JSON-LD graphs, `ai-catalog.json`) paired with semantic DOM action hooks (`data-agent-*`) that allow AI agents to navigate, reason, and execute transactions without hallucination.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                            DUAL-LAYER CORE PRINCIPLES                                    │
├──────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ 1. Zero Knowledge Drift      │ 2. Deterministic Execution  │ 3. Event-Driven Decoupling  │
│ Synchronous parity between   │ Machine-readable DOM hooks  │ Database triggers handle    │
│ dynamic JS runtime & static  │ and strict state-machine    │ notification routing and    │
│ AI-crawler endpoints.        │ feedback loops for agents.  │ business logic asynchronously│
└──────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

---

## 2. Multi-Tier End-to-End System Architecture

```mermaid
flowchart TB
    subgraph TIER1["Tier 1: AI Search & Ingestion Layer"]
        CRAWLERS["AI Crawlers\n(GPTBot, PerplexityBot, ClaudeBot, Google-Extended)"]
        ROBOTS_TXT["/robots.txt\n(Access Matrix & LLM Directives)"]
        LLMS_INDEX["/llms.txt\n(Standard Navigation Index)"]
        LLMS_FULL["/llms-full.txt\n(Full Context Knowledge Bundle)"]
        KB_MD["Domain Knowledge Markdown\n(/tours.md, /guides.md, /fleet.md, /pricing.md)"]
        JSONLD_GRAPH["Schema.org Linked Data Graph\n(TouristTrip, Person, TravelAgency, FAQPage)"]
    end
    subgraph TIER2["Tier 2: Client Runtime & Agent Action Layer"]
        HUMAN_UI["Human Client Web App\n(Vanilla ES6+, CSS Grid/Flexbox)"]
        AI_BROWSER["Autonomous Browser Agents\n(OpenAI Operator, Claude Computer Use)"]
        AI_CATALOG["/ai-catalog.json\n(Action Discovery Manifest)"]
        ACTION_HOOKS["DOM Action Hooks\n(data-agent-action, data-agent-description)"]
        STATE_MACHINE["State Machine DOM Observer\n(data-submission-status: success|error)"]
    end
    subgraph TIER3["Tier 3: Cloud & Backend Persistence Layer"]
        SUPABASE_GATEWAY["Supabase Edge / API Gateway"]
        AUTH_RLS["PostgreSQL Row-Level Security (RLS)"]
        DB_TABLES[("PostgreSQL 15+ Core Tables\n• tours\n• guides\n• bookings\n• partners\n• cosharing_requests")]
        PG_TRIGGERS["PL/pgSQL Triggers & Functions\n(Automated Cost-Sharing & Lead Dispatch)"]
    end
    subgraph TIER4["Tier 4: External Integrations & Settlement Layer"]
        TELEGRAM_BOT["Telegram Dispatch Engine\n(Instant Guide & Partner Notification)"]
        KASPI_PAY["Kaspi Pay Gateway\n(0% Markup Direct Operator Routing)"]
        PARTNER_SYSTEMS["Certified Operator Dashboards"]
    end

    %% Ingestion Connections
    CRAWLERS --> ROBOTS_TXT
    ROBOTS_TXT --> LLMS_INDEX
    LLMS_INDEX --> KB_MD
    ROBOTS_TXT --> LLMS_FULL
    CRAWLERS --> JSONLD_GRAPH

    %% Agent Execution Connections
    AI_BROWSER --> AI_CATALOG
    AI_BROWSER --> ACTION_HOOKS
    HUMAN_UI --> ACTION_HOOKS
    ACTION_HOOKS --> STATE_MACHINE
    STATE_MACHINE -.->|Deterministic State Status| AI_BROWSER

    %% Backend Connections
    HUMAN_UI -->|Secure RPC / REST| SUPABASE_GATEWAY
    ACTION_HOOKS -->|Direct Form Submissions| SUPABASE_GATEWAY
    SUPABASE_GATEWAY --> AUTH_RLS
    AUTH_RLS --> DB_TABLES
    DB_TABLES --> PG_TRIGGERS

    %% Dispatch Connections
    PG_TRIGGERS -->|Database Webhooks / HTTP| TELEGRAM_BOT
    PG_TRIGGERS -->|Realtime Channels| PARTNER_SYSTEMS
    HUMAN_UI -->|Direct Deep-Link Settlement| KASPI_PAY
```

---

## 3. Data Flow & Interaction Sequences

### Flow A: AI Search Engine Ingestion (GEO Pipeline)

This sequence guarantees that LLM-powered search engines ingest 100% verified facts (prices, certifications, itineraries) without relying on fragile heuristic scrapers.

```mermaid
sequenceDiagram
    autonumber
    actor LLM as AI Crawler
    participant R as robots.txt
    participant L as llms.txt
    participant MD as Markdown KB
    participant S as Schema.org JSON-LD

    LLM->>R: GET /robots.txt
    R-->>LLM: 200 OK (Allow, Sitemap, LLMs Index)
    LLM->>L: GET /llms.txt
    L-->>LLM: Structured Markdown Index & Anchors
    LLM->>MD: GET /tours.md, /guides.md, /pricing.md
    MD-->>LLM: Raw Markdown (Fact-Dense Text)
    LLM->>S: GET / (Extract JSON-LD from head)
    S-->>LLM: Linked Entities (TouristTrip, Person, Price)
    Note over LLM: Zero-Hallucination Semantic Indexing Complete
```

### Flow B: Autonomous Agent Web Action Execution

When an autonomous browser agent (e.g., OpenAI Operator) performs a booking on behalf of a traveler, it follows this deterministic action protocol:

```mermaid
sequenceDiagram
    autonumber
    actor Agent as Autonomous Browser Agent
    participant Catalog as /ai-catalog.json
    participant DOM as Web App DOM
    participant Supa as Supabase PostgreSQL
    participant TG as Telegram Notification Bot

    Agent->>Catalog: GET /ai-catalog.json
    Catalog-->>Agent: Action Specs (Selectors, Parameters, Data Types, Expected Status)
    Agent->>DOM: Locate element with [data-agent-action="book_tour"]
    Agent->>DOM: Populate inputs matching [data-agent-input="..."]
    Agent->>DOM: Trigger submit event on #form-booking
    DOM->>DOM: Transition state: data-submission-status="submitting"
    DOM->>Supa: INSERT INTO bookings (tour_id, client_name, contact, guests)

    alt Successful Insert
        Supa-->>DOM: 201 Created (Booking ID Generated)
        Supa->>TG: Trigger PG notification -> Telegram Dispatch
        DOM->>DOM: Set data-submission-status="success", role="status", aria-live="polite"
        DOM-->>Agent: Visual & DOM Confirmation Received
    else Validation / Network Error
        Supa-->>DOM: Error Payload
        DOM->>DOM: Set data-submission-status="error", data-agent-error="INVALID_PHONE"
        DOM-->>Agent: Machine-Readable Error for Self-Correction
    end
```

---

## 4. Frontend Architecture & Zero-Drift Synchronization

To eliminate the common flaw where single-page apps render empty shells for non-JavaScript crawlers, the platform implements a **Zero-Drift Dual-Storage Architecture**:

```
                              ┌─────────────────────────────┐
                              │     Central Source of       │
                              │        Truth Data           │
                              └──────────────┬──────────────┘
                                             │
                     ┌───────────────────────┴───────────────────────┐
                     ▼                                               ▼
      ┌─────────────────────────────┐                 ┌─────────────────────────────┐
      │   JavaScript Dynamic Map    │                 │   Static HTML Fallbacks &   │
      │         (app.js)            │                 │   Schema.org JSON-LD        │
      ├─────────────────────────────┤                 ├─────────────────────────────┤
      │ • Client-side filtering     │                 │ • Static SEO crawlers       │
      │ • Modal hydration           │                 │ • Accessibility screeners   │
      │ • Reactive price updates    │                 │ • LLM DOM scrapers          │
      └─────────────────────────────┘                 └─────────────────────────────┘
                     ▲                                               ▲
                     └───────────────────────┬───────────────────────┘
                                             │ Verified by
                              ┌──────────────┴──────────────┐
                              │  Agentic CI/CD Guardrails   │
                              │  (Zero-Drift Lint Audits)   │
                              └─────────────────────────────┘
```

**Key Technical Decisions:**

- **No Heavy Framework Overhead:** Built in vanilla ES6+ with native Web APIs (`IntersectionObserver`, `CustomEvent`, CSS Variables) ensuring instantaneous loading on mobile connections in mountain basecamps.
- **Synchronous Content Updates:** Any modification to tour parameters (itineraries, base prices, elevation) is synchronously reflected across both dynamic JavaScript maps and static HTML nodes, preventing hydration mismatches.

---

## 5. Web Actions Protocol Specification

The platform standardizes Web Actions to make the DOM self-describing for vision and DOM-based AI agents.

**Core DOM Attributes:**

| Attribute | Purpose | Example Value |
|---|---|---|
| `data-agent-action` | Identifies the business capability of a form or button | `book_tour`, `order_transfer`, `filter_difficulty` |
| `data-agent-description` | Natural language instructions for LLM planning | `Submits booking directly to certified guide with 0% markup` |
| `data-agent-input` | Explicit semantic tag for form inputs | `client_name`, `contact_info`, `guests_count` |
| `data-submission-status` | Deterministic state machine indicator | `idle`, `submitting`, `success`, `error` |
| `data-agent-error` | Machine-readable error code for agent retry logic | `INVALID_CONTACT`, `CAPACITY_EXCEEDED` |

---

## 6. Event-Driven Backend & Database Architecture

The backend infrastructure utilizes Supabase (PostgreSQL 15+) configured with automated triggers and event streams:

```
[ Client Form Submission ]
            │
            ▼
[ PostgreSQL Table: public.bookings ] ──► (Row-Level Security Enforcement)
            │
            ▼ (AFTER INSERT Trigger)
[ PL/pgSQL Function: notify_new_booking() ]
            │
            ▼
[ pg_net HTTP Post / Database Webhook ]
            │
            ▼
[ Telegram Dispatcher Bot / Partner SMS Queue ]
```

**Highlights:**

- **Asynchronous Notification Routing:** Eliminates API latency on the frontend by offloading partner dispatching to native PostgreSQL triggers.
- **Co-Sharing Cost Splitting:** Triggers on `cosharing_requests` automatically recompute per-person prices dynamically when new participants join an open expedition slot.
- **Strict Data Isolation:** Row-Level Security (RLS) ensures partners and guides only access bookings assigned to their certified organization ID.

---

## 7. Reliability, Scalability & Failure Modes

```
┌───────────────────────────┬───────────────────────────┬───────────────────────────┐
│ FAILURE MODE              │ IMPACT                    │ MITIGATION STRATEGY       │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ AI Crawler Rate Limit     │ Slowed search ingestion   │ Edge-cached static .md    │
│                           │                           │ and llms.txt at CDN edge  │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Database Connection Spike │ Delayed booking write     │ Fallback localStorage     │
│                           │                           │ queue + background retry  │
├───────────────────────────┼───────────────────────────┼───────────────────────────┤
│ Kaspi Gateway Downtime    │ Inability to pay online   │ Direct guide invoice      │
│                           │                           │ dispatch via Telegram     │
└───────────────────────────┴───────────────────────────┴───────────────────────────┘
```

---
