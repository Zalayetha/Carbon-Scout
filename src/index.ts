import { Studio } from "@anvia/studio";
import { createAgent } from "./agent.js";
import { sandbox, tools } from "./sandbox.js";

const agent = createAgent();

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
