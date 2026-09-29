import { Agent } from "@anvia/core";
import { exactMatch, runEvalCli } from "@anvia/core/evals";
import { z } from "zod";
import { BASE_INSTRUCTIONS } from "../../instruction.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import { exactMatchCases } from "./exactMatch-cases.js";

export const carbonScoutTaskSchema = z.object({
  taskType: z.enum(["market_benchmark", "regulatory_audit", "abstention_notice"]),
  targetAsset: z.string(),
  status: z.enum(["COMPLETED", "ABSTAINED"]),
  outputFile: z.string(),
});

const agent = new Agent({
  id: "carbon-scout-structured",
  model: getModel(),
  instructions: `${BASE_INSTRUCTIONS}\n\nYou must categorize the user request and return structured JSON conforming to the output schema. Output strictly matching JSON. Set outputFile to "output/carbon_scout_report.md" when a report is requested, or "output/notice.md" for abstentions/notices.`,
  outputSchema: carbonScoutTaskSchema,
});

const evalResult = await runEvalCli({
  name: "exact-match",
  cases: exactMatchCases,
  target: (input: string) => agent.generate({ prompt: input }),
  metrics: [exactMatch()],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })]
});

console.log(evalResult.results);
lens.flush();
