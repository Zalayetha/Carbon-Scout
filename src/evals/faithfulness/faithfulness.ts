import { faithfulness, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import { carbonScoutFaithfulnessCases } from "./faithfulness-cases.js";

const agent = createAgent();
const evalResult = await runEvalCli({
  name: "faithfulness-check",
  cases: carbonScoutFaithfulnessCases,
  target: (input: string) => agent.generate({ prompt: input }),
  metrics: [faithfulness({ model: getModel() })],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })]
});

console.log(evalResult.results);
lens.flush();
