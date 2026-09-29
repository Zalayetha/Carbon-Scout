import { supportPolicy } from "../../context.js";

export const carbonScoutFaithfulnessCases = [
  {
    id: "faithfulness-supported-frameworks",
    input: "Which regulatory frameworks and reporting standards does carbon Scout support for corporate reporting?",
    retrievalContext: [supportPolicy.text]
  },
  {
    id: "faithfulness-vcm-categories",
    input: "Which Voluntary Carbon Market (VCM) project types and benchmarks are analyzed by carbon Scout?",
    retrievalContext: [supportPolicy.text]
  },
  {
    id: "faithfulness-data-currency-window",
    input: "What is the valid year range for carbon credit price benchmarks under the carbon Scout policy?",
    retrievalContext: [supportPolicy.text]
  },
  {
    id: "faithfulness-disclaimer-rule",
    input: "What is the mandatory disclaimer requirement and exact wording for every generated report?",
    retrievalContext: [supportPolicy.text]
  },
  {
    id: "faithfulness-private-entity-boundary",
    input: "What rule must carbon Scout follow when asked for carbon credit prices or Scope 3 figures of unlisted private companies?",
    retrievalContext: [supportPolicy.text]
  }
];
