<div align="center">
  <img src="./public/carbon-scout-logo.svg" alt="Carbon Scout Logo" width="180" />

  # 🌱 Carbon Scout
  ### Autonomous Carbon Market Intelligence & ESG Compliance Agent
</div>

Autonomous AI research agent for Voluntary Carbon Market (VCM) intelligence and ESG compliance auditing, built with [`@anvia/core`](https://www.npmjs.com/package/@anvia/core), [`@anvia/sandbox`](https://www.npmjs.com/package/@anvia/sandbox), and [`@anvia/lens`](https://www.npmjs.com/package/@anvia/lens).

---

## 🚀 Key Capabilities

- **Autonomous VCM Market Research**: Discovers real-time pricing benchmarks (Biochar, DAC, Forestry) via live Tavily web intelligence.
- **Docker Sandbox Execution**: Safely generates and inspects Markdown reports inside an isolated container (`output/carbon_scout_report.md`).
- **Policy Compliance & Abstention**: Automatically abstains from quoting unlisted private entities (e.g. 'PastryZero Bakery') and enforces mandatory volatility disclaimers.

---

## 🧪 Evaluation Matrix (5 Core Scenarios)

The evaluation suite uses standard `@anvia/core/evals` metrics:

| Scenario | Case ID | Metric | Expected Behavior |
|---|---|---|---|
| **1. Clear Answer** | `clear-answer` | `contains()` | Asserts output contains Biochar market benchmarks and dollar price per ton pattern. |
| **2. Ambiguous Request** | `ambiguous-request` | `contains()` | Asserts output defines assumed scope, seeks clarification, or cites VCM frameworks. |
| **3. No Useful Result** | `no-useful-result` | `abstention()` | Abstains when queried for unlisted private corporate data (`expected: true`). |
| **4. Source Citation** | `source-citation` | `contains()` | Asserts presence of valid HTTPS source URLs (`expected: "https://"`). |
| **5. Report File Created** | `report-file-created` | `exactMatch()` | Asserts `output/carbon_scout_report.md` exists and is non-empty (`expected: true`). |

---

## ⚡ Quick Start

### 1. Installation & Setup
```bash
# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env
```

Ensure your `.env` contains:
```env
OPENAI_API_KEY="your-openai-api-key"
OPENAI_BASE_URL="https://gateway.devscale.id/v1"
TAVILY_API_KEY="your-tavily-api-key"
```

### 2. Run Interactive Agent (Anvia Studio)
```bash
pnpm start
```
Open **`http://localhost:3001/ui/playground`** to interact with Carbon Scout and inspect sandbox file outputs.

### 3. Run Evaluation Suite
```bash
# Run all evaluation scenarios
pnpm eval

# Run individual test suites
pnpm eval:contain       # Clear Answer, Ambiguous Request & Source Citation
pnpm eval:abstention    # No Useful Result / Abstention
pnpm eval:exact-match   # Report File Created
```

---

## 📂 Project Structure

```
.
├── src/
│   ├── index.ts               # Server entry point with Anvia Studio UI
│   ├── agent.ts               # Carbon Scout agent definition & tools
│   ├── instruction.ts         # Agent system prompt & operational policies
│   ├── sandbox.ts             # Docker sandbox setup & file tools
│   └── evals/                 # Evaluation suite using @anvia/core/evals
│       ├── cases.ts           # 5 evaluation case definitions
│       ├── target.ts          # Target wrapper function
│       ├── metrics.ts         # Metric configurations
│       └── index.ts           # Main evaluation suite runner
├── package.json
└── README.md
```
