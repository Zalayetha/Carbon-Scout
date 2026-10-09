import {
  abstention,
  contains,
  exactMatch,
} from "@anvia/core/evals";
import { getModel } from "../model.js";

/** Abstention metric evaluating No Useful Result case */
export const abstentionMetric = abstention({
  model: getModel(),
  shouldAbstain: ({ case: testCase }) => testCase.expected === true,
});

/** Contain metric evaluating Source Citation case */
export const containMetric = contains();

/** ExactMatch metric evaluating Report File Created case */
export const exactMatchMetric = exactMatch();
