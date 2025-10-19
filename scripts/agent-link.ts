import { Agent, tool, run } from "@openai/agents"
import { z } from "zod"

const CreateCheckoutInput = z.object({
  amount_cents: z.number().int().nonnegative(),
  listing_name: z.string().min(1),
  user_id: z.string().min(1),
})
type CreateCheckoutInput = z.infer<typeof CreateCheckoutInput>

const UpsertOrderInput = z.object({
  listing_id: z.string().min(1),
  user_id: z.string().min(1),
  amount_cents: z.number().int().nonnegative(),
  checkout_session_id: z.string().min(1),
})
type UpsertOrderInput = z.infer<typeof UpsertOrderInput>

const createCheckout = tool({
  name: "stripe.create_checkout",
  description: "Create a Stripe Checkout Session for a listing.",
  parameters: {
    type: "object",
    additionalProperties: false,
    properties: {
      amount_cents: { type: "integer", minimum: 0 },
      listing_name: { type: "string" },
      user_id: { type: "string" },
    },
    required: ["amount_cents", "listing_name", "user_id"],
  } as const,
  async execute(input: unknown) {
    const { amount_cents, listing_name, user_id } =
      CreateCheckoutInput.parse(input)

    const fakeSessionId = "cs_test_123"
    const fakeUrl = "https://checkout.stripe.com/test_session"

    return {
      ok: true,
      session_url: fakeUrl,
      checkout_session_id: fakeSessionId,
      meta: { amount_cents, listing_name, user_id },
    }
  },
})

const upsertOrder = tool({
  name: "db.upsert_order",
  description: "Upsert an order record in Neon Postgres.",
  parameters: {
    type: "object",
    additionalProperties: false,
    properties: {
      listing_id: { type: "string" },
      user_id: { type: "string" },
      amount_cents: { type: "integer", minimum: 0 },
      checkout_session_id: { type: "string" },
    },
    required: ["listing_id", "user_id", "amount_cents", "checkout_session_id"],
  } as const,
  async execute(input: unknown) {
    const { listing_id, user_id, amount_cents, checkout_session_id } =
      UpsertOrderInput.parse(input)

    return {
      ok: true,
      status: "pending",
      order_id: "ord_12345",
      meta: { listing_id, user_id, amount_cents, checkout_session_id },
    }
  },
})

const commerceAgent = new Agent({
  name: "CommerceAgent",
  instructions:
    "You are the Suburbmates Commerce Agent. When a user requests checkout for a listing, " +
    "use stripe.create_checkout to generate a session, then persist with db.upsert_order.",
  model: "gpt-5",
  tools: [createCheckout, upsertOrder],
  outputType: "object",
})

async function main() {
  const prompt =
    "Create a checkout for listing 'Local Starter' at $10.00 (1000 cents) for user U1, then persist the order."

  const result = await run(commerceAgent, prompt)
  console.log("✅ Agent run result:")
  console.log(JSON.stringify(result, null, 2))
}

main().catch((err) => {
  console.error("❌ AgentLink Error:", err)
  process.exit(1)
})
