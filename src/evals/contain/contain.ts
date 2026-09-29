import { contains, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { lens } from "../../observer.js";
import { carbonScoutContainCases } from "./contain-cases.js";

const agent = createAgent();
const evalResult = await runEvalCli({
  name: "contain-check",
  cases: carbonScoutContainCases,
  target: (input: string) => agent.generate({ prompt: input }),
  metrics: [contains()],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })]
});

console.log(evalResult.results);
lens.flush();
