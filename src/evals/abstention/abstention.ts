import { abstention, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import {carbonScoutAbstentionCases} from "./abstention-cases.js";

const agent = createAgent()
const evalResult = await runEvalCli({
  name: "abstention",
  cases: carbonScoutAbstentionCases,
  target: (input: string) => agent.generate({ prompt: input }),
  metrics: [abstention({
    model: getModel(),
    shouldAbstain: ({ case: testCase }) => testCase.expected === true,
  })],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })]
});

console.log(evalResult.results);
lens.flush();
