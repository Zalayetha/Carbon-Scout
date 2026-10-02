import { faithfulness, runEvalCli } from "@anvia/core/evals";
import { createAgent } from "../../agent.js";
import { getModel } from "../../model.js";
import { lens } from "../../observer.js";
import { faithfulnessCases } from "../cases.js";
import { createEvalTarget } from "../target.js";

const agent = createAgent();
const target = createEvalTarget(agent);

const evalResult = await runEvalCli({
  name: "faithfulness-eval",
  cases: faithfulnessCases,
  target,
  metrics: [
    faithfulness({
      model: getModel(),
    }),
  ],
  format: "pretty",
  exitCode: true,
  reporters: [lens.evalReporter({ includePayloads: true })],
});

console.log(evalResult.results);
lens.flush();
