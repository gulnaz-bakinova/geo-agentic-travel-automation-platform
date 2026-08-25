# Agentic Engineering Workflows & CI/CD Guardrails

### Autonomous Agent Skills, Multi-Agent Review Pipelines, and Zero-Regression AST Guardrails

---

## 1. The Challenge of Uncontrolled AI Coding

In modern software development, using raw LLMs for code generation without architectural boundaries often introduces **AI code drift**:

- Bulk regex scripts that accidentally truncate critical DOM elements.
- Broken syntax and unescaped strings in production bundles.
- Knowledge divergence where runtime logic updates, but Schema.org graphs and `llms.txt` endpoints are left stale.

To solve this, the platform implements an **Agentic Engineering Framework** with specialized sub-agent routines, surgical file-editing protocols, and automated AST validation hooks.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                          AGENTIC ENGINEERING PRINCIPLES                                  │
├──────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ 1. Specialized Agent Skills  │ 2. Surgical AST Mutations   │ 3. Multi-Agent Peer Audits  │
│ Modular agent routines with  │ No bulk regex scripts; only │ Automated secondary agent   │
│ isolated domain scopes.      │ precise AST replacements.   │ verifies every pull request.│
└──────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

---

## 2. Agentic System Architecture & Skill Hierarchy

```mermaid
flowchart TB
    subgraph ORCHESTRATOR["Agentic Orchestrator (Antigravity Core)"]
        PROMPT["Developer Intent / Task"]
        ROUTER["Skill Router & Context Evaluator"]
    end
    subgraph SKILLS["Specialized Agent Skills (.agents/skills)"]
        SKILL_GEO["geo_optimizer\n• Schema.org JSON-LD audits\n• llms.txt & llms-full.txt sync\n• AI Crawler access rules"]
        SKILL_PROD["add_product\n• Dual-entry catalog injection\n• Zero-drift HTML/JS sync\n• Surgical AST edits"]
        SKILL_REVIEW["review_kirill\n• Multi-agent PR code review\n• Broken reference screener\n• Architecture anti-pattern checks"]
        SKILL_LAND["create_landing_page\n• Programmatic LP generation\n• Unified design token inheritance\n• Shared header/footer binding"]
    end
    subgraph GUARDRAILS["Deterministic Verification Pipeline"]
        AST_CHECK["AST Syntax Validator\n(node -c app.js)"]
        SCHEMA_VAL["JSON-LD Schema Validator"]
        SYNC_AUDIT["Dual-State Parity Auditor"]
    end
    subgraph OUTPUT["Production Deployment"]
        APP_JS["Runtime JavaScript Engine"]
        SSR_HTML["Static SEO/GEO Fallbacks"]
        KB_FILES["Markdown & llms.txt Endpoints"]
    end
    PROMPT --> ROUTER
    ROUTER --> SKILL_GEO
    ROUTER --> SKILL_PROD
    ROUTER --> SKILL_REVIEW
    ROUTER --> SKILL_LAND
    SKILL_GEO --> GUARDRAILS
    SKILL_PROD --> GUARDRAILS
    SKILL_REVIEW --> GUARDRAILS
    SKILL_LAND --> GUARDRAILS
    GUARDRAILS -->|Pass All Assertions| OUTPUT
    GUARDRAILS -.->|Fail Assertion: Auto-Rollback| ROUTER
```

---

## 3. Deep Dive: Core Agent Skills

### Skill 1: `geo_optimizer` (Generative Engine Optimization)

**Scope:** Guarantees that every update to tours, mountain guides, pricing tiers, or aviation routes is instantly synchronized into machine-readable knowledge formats.

**Automated Actions:**

- Inspects DOM modifications for changes in `TouristTrip`, `Person`, or `Offer` entities.
- Updates `/tours.md`, `/pricing.md`, `/guides.md`, `/fleet.md`, and `/llms.txt`.
- Validates that all interactive forms maintain valid `data-agent-action` and `data-agent-description` attributes.
- Verifies crawler permissions in `/robots.txt` for GPTBot, PerplexityBot, and ClaudeBot.

### Skill 2: `add_product` (Surgical Catalog Engineering)

**Scope:** Eliminates manual data entry errors and prevents accidental layout breaks when adding new expeditions or helicopter charters.

**Automated Actions:**

- **Dual-Entry Ingestion:** Injects new tour data simultaneously into the JavaScript dictionary (`app.js`) and the server-rendered fallback cards in `index.html`.
- **Image Asset Integrity:** Enforces zero path-guessing by verifying local image existence on disk before committing references.
- **Mandatory Syntax Gate:** Automatically triggers `node -c app.js` to ensure 100% valid JavaScript AST prior to task completion.

### Skill 3: `review_kirill` (Autonomous Multi-Agent Code Review)

**Scope:** Acts as an autonomous Senior Code Reviewer, inspecting partner commits for architectural compliance, duplicate definitions, and security regressions.

**Review Checklist Executed by Agent:**

- **Zero Bulk Scripts:** Rejects any ad-hoc Python/Node scripts that use unsafe regex substitutions for content updates.
- **Reference Screener:** Flags any missing image assets, dead anchors, or broken CSS classes.
- **State Synchronization:** Confirms that modified tour IDs exist in both `app.js` and `index.html`.
- **Language & Tone:** Enforces comprehensive Russian-language audit reports with structured bullet points and diff highlights.

---

## 4. Multi-Agent Review & Verification Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Partner Developer / Agent
    participant Hub as Git Repository & CI Trigger
    participant ReviewAgent as review_kirill Sub-Agent
    participant AST as AST Syntax Gate
    participant GEO as geo_optimizer Sub-Agent
    participant Main as Main Production Branch

    Dev->>Hub: Push Commit or PR (New Tour Addition)
    Hub->>ReviewAgent: Trigger Automated Agent Audit
    ReviewAgent->>AST: Run node -c app.js
    alt Syntax Error Detected
        AST-->>ReviewAgent: Syntax Error at line X
        ReviewAgent-->>Dev: Automated Rejection & Exact AST Fix
    else Syntax Valid
        AST-->>ReviewAgent: AST Clean (Exit Code 0)
    end
    ReviewAgent->>ReviewAgent: Audit HTML/JS Parity & Image Paths
    ReviewAgent->>GEO: Trigger GEO & llms.txt Sync Verification
    GEO->>GEO: Verify JSON-LD Schema & Markdown Consistency
    GEO-->>ReviewAgent: GEO Verification OK
    ReviewAgent-->>Hub: Post Structured Audit Report & Approve PR
    Hub->>Main: Safe Merge with Zero Knowledge Drift
```

---

## 5. Architectural Guardrail Rules (Summary Table)

| Rule Name | Enforcement Mechanism | Purpose & Protection |
|---|---|---|
| **No Bulk Scripts** | Multi-Agent Review Screener | Prohibits untracked regex replacement scripts that cause data loss |
| **Surgical Edits Only** | Agentic Tooling Policy | Enforces targeted AST line-range mutations with context verification |
| **Dual-Entry Parity** | `add_product` Routine | Eliminates discrepancies between dynamic JS state and static HTML |
| **Mandatory AST Gate** | `node -c app.js` CLI Hook | Blocks commits with broken JS syntax or unescaped strings |
| **Zero Path Guessing** | Local Asset Verifier | Ensures all media files exist on disk before referencing in DOM |
| **GEO Synchronicity** | `geo_optimizer` Hook | Guarantees real-time parity between web UI and LLM knowledge files |

---

## 6. Engineering Outcomes & Operational Metrics

```
┌──────────────────────────────────────┬────────────────────────────────────────┐
│ AGENTIC WORKFLOW METRIC              │ VALUE / MEASUREMENT                    │
├──────────────────────────────────────┼────────────────────────────────────────┤
│ 🛡️ Production JS Syntax Failures     │ 0 (100% prevented by AST Gate)         │
│ ⏱️ Catalog Update Cycle Time         │ Reduced from 45 min to < 3 min         │
│ 🔄 Knowledge Graph Drift             │ 0% divergence across all 16 tours      │
│ 🤖 Agent Audit Coverage              │ 100% of pull requests and commits      │
└──────────────────────────────────────┴────────────────────────────────────────┘
```

---
