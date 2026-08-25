# Contributing to MORN Travel Platform

Thanks for your interest in contributing! This document explains how to propose changes, our engineering standards, and the automated guardrails that protect production.

---

## 📋 Ground Rules

Before you contribute, please read:

1. **[Architecture Deep Dive](./ARCHITECTURE.md)** — understand the dual-layer AI-native design
2. **[Agentic Workflows](./AGENTIC_WORKFLOWS.md)** — learn the surgical AST editing philosophy
3. **[Security Policy](./SECURITY.md)** — data protection, RLS, and prompt injection defense

**Golden rule:** *No bulk regex scripts. Ever.* All content updates go through surgical AST edits or specialized agent skills.

---

## 🚀 How to Contribute

### 1. Report a Bug

Open an [Issue](https://github.com/gulnaz-bakinova/geo-agentic-travel-automation-platform/issues) with:

- **Environment**: browser, OS, screen resolution
- **Steps to reproduce**: numbered list
- **Expected vs actual behavior**
- **Screenshots** if UI is affected

### 2. Propose a Feature

Open an Issue tagged `enhancement` and describe:

- **Problem**: what user pain point does this solve?
- **Proposed solution**: high-level approach
- **Alternatives considered**: what else did you think about?

### 3. Submit a Pull Request

```bash
# 1. Fork the repo and create a feature branch
git checkout -b feature/your-feature-name

# 2. Make surgical changes (no bulk regex scripts!)
# 3. Run the AST syntax gate BEFORE committing
node -c app.js

# 4. Verify dual-entry parity (app.js ↔ index.html)
# 5. Commit with a descriptive message (see below)
git commit -m "feat: add real-time seat counter to cosharing modal"

# 6. Push and open a Pull Request
git push origin feature/your-feature-name
```

---

## ✍️ Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
| :--- | :--- |
| `feat:` | New feature (adds a tour, a modal, an integration) |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `refactor:` | Code restructuring without behavior change |
| `perf:` | Performance improvement |
| `security:` | Security fix or hardening |
| `chore:` | Build tools, dependencies, minor housekeeping |

**Examples:**
```
feat: add helicopter transfer to fleet catalog
fix: escape HTML in Telegram webhook payload
docs: update GEO specification with llms-full.txt schema
security: enforce HMAC verification on Kaspi callbacks
```

---

## 🛡️ Mandatory Guardrails

Every pull request must pass these checks before merge:

### 1. AST Syntax Gate
```bash
node -c app.js
# Exit code MUST be 0
```

### 2. Dual-Entry Parity
Any change to a tour, guide, or price must appear in **BOTH**:
- `app.js` (dynamic JavaScript dictionary)
- `index.html` (static SEO/GEO fallback)

### 3. GEO Synchronization
If tour data changes, verify these files are updated:
- `/tours.md`
- `/pricing.md`
- `/llms.txt`
- Schema.org JSON-LD in `<head>`

### 4. Zero Path Guessing
All image references must point to files that exist on disk. No 404s.

### 5. Automated Multi-Agent Review
The `review_kirill` sub-agent will automatically audit your PR for:
- Broken references (missing images, dead anchors)
- Duplicate tour definitions
- Bulk regex substitutions (auto-rejected)
- Missing consent checkboxes on data-collection forms

---

## 🎨 Code Style

- **JavaScript**: vanilla ES6+, no frameworks. Use native Web APIs (`IntersectionObserver`, `CustomEvent`, CSS Variables).
- **CSS**: mobile-first, use CSS Grid and Flexbox. No preprocessors.
- **HTML**: semantic tags, `data-agent-*` attributes on interactive elements.
- **SQL**: PostgreSQL 15+ syntax, always include RLS policies for new tables.
- **File naming**: `kebab-case.js` for scripts, `SNAKE_CASE.md` for major documentation.

---

## 🔒 Security Reports

**Do not open public Issues for security vulnerabilities.**

Instead, email the maintainer directly through [LinkedIn](https://www.linkedin.com/in/gulnaz-bakinova/) with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact

You'll receive a response within 48 hours.

---

## 📜 Code of Conduct

Be respectful. Be constructive. Assume good intent.

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

---

## 🙏 Recognition

All contributors are credited in release notes and the project's [CHANGELOG.md](./CHANGELOG.md).

Thanks for helping build the future of AI-native travel automation! 🏔️
