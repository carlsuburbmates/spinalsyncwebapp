declare module "@openai/agents" {
  interface AgentOptions {
    name?: string
    instructions?: string
    model?: string
    tools?: unknown[]
    outputType?: string
  }

  interface ToolDefinition {
    name: string
    description?: string
    parameters?: Record<string, unknown>
    execute: (input: unknown, context?: unknown) => Promise<unknown> | unknown
  }

  export class Agent {
    constructor(options: AgentOptions)
  }

  export function tool<T extends ToolDefinition>(definition: T): T

  export function run(agent: Agent, input: string | string[]): Promise<unknown>
}
