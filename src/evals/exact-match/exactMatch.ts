import { exactMatch, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { lens } from "../../observer.js";
import { exactMatchCases } from "../cases.js";
import { createEvalTarget } from "../target.js";

const agent = createAgent();
const target = createEvalTarget(agent);

const evalResult = await runEvalCli({
  name: "report-file-created-exact-match-eval",
  cases: exactMatchCases,
  target,
  metrics: [exactMatch()],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

console.log(evalResult.results);
lens.flush();
