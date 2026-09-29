import { Agent } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./instruction.js";
import { getModel } from "./model.js";
import { tools } from "./sandbox.js";
import { supportPolicy } from "./context.js";

export function createAgent() {
  return new Agent({
    id: "carbon market intelligence agent",
    model: getModel(),
    instructions: BASE_INSTRUCTIONS,
    context: [
      {
        id: 'support-policy',
        text: supportPolicy.text,
        additionalProps: {
          source: 'support-policy-doc',
          version: "v1"
        }
      }
    ],
    tools: [...tools]
  })
}
