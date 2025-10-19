# Commerce Agent Workflow

This document describes the prototype agent tooling that lives in `scripts/agent-link.ts`. The goal is to exercise multi-step commerce flows (checkout + order persistence) before wiring them to real services.

---

## Overview

- **Agent runtime:** `@openai/agents` (temporary type shim in `types/openai-agents.d.ts`)
- **Validation:** Zod schemas for each tool with `additionalProperties: false`
- **Tools:**
  - `stripe.create_checkout` – mocks creating a Stripe Checkout session
  - `db.upsert_order` – mocks persisting a pending order in Neon Postgres
- **Entry point:** `pnpm agent:link`

The agent receives a plain-text instruction, chooses the tools, validates payloads, and returns the composed result.

---

## Prerequisites

- Node.js 20.x
- pnpm 10.x (`corepack enable`)
- `ts-node` (already listed in `devDependencies`)

Install dependencies if you have not already:

```bash
pnpm install
```

---

## Running the Agent

```bash
pnpm agent:link
```

Expected output:

```
✅ Agent run result:
{
  "ok": true,
  "session_url": "...",
  "checkout_session_id": "...",
  "order_id": "...",
  ...
}
```

The data is fake; swap the TODO comments with real SDK calls when integrating Stripe or Neon.

---

## Modifying Tool Schemas

1. Update the Zod schemas (`CreateCheckoutInput`, `UpsertOrderInput`) to match the real payloads.
2. Ensure the JSON schema (`parameters` block inside each tool) matches the Zod definition so the agent and runtime remain in sync.
3. Extend the shim in `types/openai-agents.d.ts` if the library adds new surface area.
4. When returning new fields, adjust downstream callers or responders accordingly.

---

## Limitations & Next Steps

- The current implementation returns canned responses. Replace the TODO sections with real Stripe/Neon clients once credentials are available.
- Consider moving the type declarations into a published package or official SDK once `@openai/agents` is public.
- Add end-to-end tests around `scripts/agent-link.ts` if the workflow becomes critical.

---

For broader project guidelines, see `README.md` and `.github/copilot-instructions.md`.
