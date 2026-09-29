import { Agent } from "@anvia/core";
import { BASE_INSTRUCTIONS } from "./instruction.js";
import { getModel } from "./model.js";
import { tools } from "./sandbox.js";

export function createAgent() {
  return new Agent({
    id: "carbon market intelligence agent",
    model: getModel(),
    instructions: BASE_INSTRUCTIONS,
    tools: [...tools]
  })
}
