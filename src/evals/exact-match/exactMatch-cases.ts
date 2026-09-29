export const exactMatchCases = [
  {
    id: "exact-biochar-benchmark",
    input: "Run a market benchmark research task on Biochar carbon credits and output the report file.",
    expected: {
      taskType: "market_benchmark",
      targetAsset: "Biochar",
      status: "COMPLETED",
      outputFile: "output/carbon_scout_report.md",
    },
  },
  {
    id: "exact-eucbam-audit",
    input: "Execute a regulatory compliance audit for EU CBAM Scope 3 accounting and generate a report.",
    expected: {
      taskType: "regulatory_audit",
      targetAsset: "EU CBAM",
      status: "COMPLETED",
      outputFile: "output/carbon_scout_report.md",
    },
  },
  {
    id: "exact-private-abstention",
    input: "Retrieve confidential contract prices for unlisted PastryZero Bakery.",
    expected: {
      taskType: "abstention_notice",
      targetAsset: "PastryZero Bakery",
      status: "ABSTAINED",
      outputFile: "output/notice.md",
    },
  }
];
