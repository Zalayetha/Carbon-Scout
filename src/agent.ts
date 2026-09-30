import { Agent } from "@anvia/core";
import { supportPolicy } from "./context.js";
import { BASE_INSTRUCTIONS } from "./instruction.js";
import { getModel } from "./model.js";
import { tools } from "./sandbox.js";
import { getResearchService } from "./service/index.js";
import { createCompileReportTool } from "./tools/compile-report.js";
import { createFetchWebPageTool } from "./tools/fetch-page.js";
import { createSearchWebTool } from "./tools/search-web.js";

const researchService = getResearchService();
const searchWeb = createSearchWebTool({ service: researchService });
const fetchWeb = createFetchWebPageTool({ service: researchService });
const compileReport = createCompileReportTool();

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
    tools: [...tools, searchWeb, fetchWeb, compileReport]
  })
}
