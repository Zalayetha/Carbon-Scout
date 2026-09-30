import { mockResearchService } from "./mock-research-service";
import { researchService } from "./research-service";
import type { ResearchService } from "./types";

/**
 * Returns either the real or mock research service based on the USE_MOCK_SERVICES env var or availability of TAVILY_API_KEY.
 */
export function getResearchService(): ResearchService {
  if (process.env.USE_MOCK_SERVICES === "true" || !process.env.TAVILY_API_KEY) {
    return mockResearchService;
  }
  return researchService;
}
