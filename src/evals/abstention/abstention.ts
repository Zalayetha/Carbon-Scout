import { abstention, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import { abstentionCases } from "../cases.js";
import { createEvalTarget } from "../target.js";

const agent = createAgent();
const target = createEvalTarget(agent);

const evalResult = await runEvalCli({
  name: "abstention-eval",
  cases: abstentionCases,
  target,
  metrics: [
    abstention({
      model: getModel(),
      shouldAbstain: ({ case: testCase }) => testCase.expected === true,
    }),
  ],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

console.log(evalResult.results);
lens.flush();
