import { Agent } from "@anvia/core";
import type { AgentObservabilityOptions } from "@anvia/core/observability";
import { supportPolicy } from "./context.js";
import { BASE_INSTRUCTIONS } from "./instruction.js";
import { getModel } from "./model.js";
import { getSandboxTools } from "./sandbox.js";
import { getResearchService } from "./service/index.js";
import { createCompileReportTool } from "./tools/compile-report.js";
import { createFetchWebPageTool } from "./tools/fetch-page.js";
import { createSearchWebTool } from "./tools/search-web.js";

const researchService = getResearchService();
const searchWeb = createSearchWebTool({ service: researchService });
const fetchWeb = createFetchWebPageTool({ service: researchService });
const compileReport = createCompileReportTool();

export type CreateAgentOptions = {
  /** Observers to attach, e.g. Lens tracing for eval runs. Omitted means no tracing. */
  observability?: AgentObservabilityOptions;
};

export async function createAgent(options: CreateAgentOptions = {}) {
  const tools = await getSandboxTools();
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
    tools: [...tools, searchWeb, fetchWeb, compileReport],
    observability: options.observability
  })
}
