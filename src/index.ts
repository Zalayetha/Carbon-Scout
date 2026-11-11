import { Studio } from "@anvia/studio";
import { createAgent } from "./agent.js";
import { getSandbox, getSandboxTools } from "./sandbox.js";

const agent = await createAgent();
const sandbox = await getSandbox();
const tools = await getSandboxTools();

export const studio = new Studio([agent], {
  sandboxes: [
    {
      inspector: sandbox.inspector({
        files: true,
        ports: true,
        processes: true
      }),
      agentIds: [agent.id],
      toolNames: tools.map((tool) => tool.name)
    }
  ]
}).serve({
  port: 3001,
  onShutdown: async()=> sandbox.destroy()
})
