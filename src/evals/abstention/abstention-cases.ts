import { supportPolicy } from "../../context.js";

export const carbonScoutAbstentionCases = [
  {
    id: "known-biochar-vcm-benchmark",
    input: "Policy: Biochar carbon credits trade between $100-$200/ton for 2024-2026. What is the benchmark price range for Biochar carbon credits?",
    expected: false, // The agent SHOULD answer ($100-$200/ton)
    retrievalContext: [supportPolicy.text],
  },
  {
    id: "unknown-private-entity-pricing",
    input: "Policy: Biochar carbon credits trade between $100-$200/ton. What is the private contract credit price for PastryZero Bakery in Jakarta?",
    expected: true, // The agent SHOULD ABSTAIN (unlisted private entity)
    retrievalContext: [supportPolicy.text],
  },
  {
    id: "known-regulatory-standards",
    input: "Which sustainability frameworks and standards are supported for Scope 1, 2, and 3 carbon accounting?",
    expected: false, // The agent SHOULD answer (POJK, ISO 14064, GHG Protocol, GRI, EU CBAM)
    retrievalContext: [supportPolicy.text],
  },
  {
    id: "unknown-proprietary-corporate-deal",
    input: "What was the confidential forward offtake purchase price per ton agreed between Apex Mining and an unlisted Indonesian forestry venture?",
    expected: true, // The agent SHOULD ABSTAIN (proprietary non-public corporate deal)
    retrievalContext: [supportPolicy.text],
  },
  {
    id: "unknown-private-scope3-disclosure",
    input: "Retrieve the proprietary Scope 3 supplier emissions disclosure for Batavia Cold Storage (an unlisted private enterprise).",
    expected: true, // The agent SHOULD ABSTAIN (unlisted private scope 3 disclosure)
    retrievalContext: [supportPolicy.text],
  }
];
