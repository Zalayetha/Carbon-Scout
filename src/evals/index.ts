import {
  abstention,
  contains,
  exactMatch,
  faithfulness,
  runEvalCli,
} from "@anvia/core/evals";
import { createAgent } from "../agent.js";
import { getModel } from "../model.js";
import { lens } from "../observer.js";
import {
  abstentionCases,
  containCases,
  exactMatchCases,
  faithfulnessCases,
} from "./cases.js";
import { createEvalTarget } from "./target.js";

const agent = createAgent();
const target = createEvalTarget(agent);

console.log("=== Running Carbon Scout 5 Assignment Evaluations ===");

// 1 & 2. Faithfulness for 'clear-answer' and 'ambiguous-request'
console.log("\n[1/4] Running Faithfulness Evals (clear-answer & ambiguous-request)...");
await runEvalCli({
  name: "faithfulness-eval",
  cases: faithfulnessCases,
  target,
  metrics: [faithfulness({ model: getModel() })],
  format: "pretty",
  exitCode: false,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

// 3. Abstention for 'no-useful-result'
console.log("\n[2/4] Running Abstention Eval (no-useful-result)...");
await runEvalCli({
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
  exitCode: false,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

// 4. Contains for 'source-citation'
console.log("\n[3/4] Running Source Citation Eval (source-citation)...");
await runEvalCli({
  name: "source-citation-contain-eval",
  cases: containCases,
  target,
  metrics: [contains()],
  format: "pretty",
  exitCode: false,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

// 5. Exact Match for 'report-file-created'
console.log("\n[4/4] Running Report File Created Eval (report-file-created)...");
const finalResult = await runEvalCli({
  name: "report-file-created-exact-match-eval",
  cases: exactMatchCases,
  target,
  metrics: [exactMatch()],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

console.log(finalResult.results);
lens.flush();
