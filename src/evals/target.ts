import type { EvalCase } from "@anvia/core/evals";
import type { createAgent } from "../agent.js";
import { sandbox, tools } from "../sandbox.js";

/**
 * Creates an evaluation target function that invokes the agent and:
 * - Returns boolean true/false for 'report-file-created' by reading the sandbox file
 * - Returns chat response combined with report file content for 'source-citation'
 * - Returns conversational chat response for faithfulness / abstention cases
 */
export function createEvalTarget(agent: ReturnType<typeof createAgent>) {
  return async (input: string, testCase: EvalCase<string, unknown>): Promise<string | boolean> => {
    // 1. Invoke the agent
    const response = await agent.generate({ prompt: input });
    let chatResponse = "";

    if ("output" in response && typeof response.output === "string") {
      chatResponse = response.output;
    } else if ("output" in response && response.output !== undefined) {
      chatResponse = JSON.stringify(response.output);
    }

    // Helper: Read sandbox report file
    let reportFileContent = "";
    let reportFileExists = false;

    try {
      const readFileTool = tools.find((t) => t.name === "read_file");
      if (readFileTool) {
        const raw = await readFileTool.call({ path: "output/carbon_scout_report.md" });
        if (typeof raw === "string" && raw.length > 0) {
          reportFileContent = raw;
          reportFileExists = true;
        } else if (raw && typeof raw === "object") {
          const rawObj = raw as Record<string, unknown>;
          if (typeof rawObj.content === "string") {
            reportFileContent = rawObj.content;
            reportFileExists = true;
          } else if (typeof rawObj.text === "string") {
            reportFileContent = rawObj.text;
            reportFileExists = true;
          }
        }
      }
    } catch {
      // File may not exist yet
    }

    if (!reportFileExists) {
      try {
        const text = await sandbox.runtime.readTextFile({ path: "output/carbon_scout_report.md" });
        if (typeof text === "string" && text.length > 0) {
          reportFileContent = text;
          reportFileExists = true;
        }
      } catch {
        // File does not exist
      }
    }

    const reportFileNonEmpty = reportFileExists && reportFileContent.trim().length > 0;

    // 2. Scenario-specific target return values:
    // For 'report-file-created': Return boolean assertion that file exists and content.length > 0
    if (testCase.id === "report-file-created") {
      return reportFileNonEmpty;
    }

    // For 'source-citation': Return combined output so contains("https://") checks response + report
    if (testCase.id === "source-citation") {
      return [chatResponse, reportFileContent].filter(Boolean).join("\n\n");
    }

    // For clear-answer, ambiguous-request, and no-useful-result: Return the conversational chat response
    return chatResponse;
  };
}
