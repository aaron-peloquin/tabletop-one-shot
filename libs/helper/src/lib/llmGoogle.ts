import { GooglePaLM } from "langchain/llms/googlepalm";

export const llmGoogle = new GooglePaLM({
  safetySettings: [
    {
      category: "HARM_CATEGORY_DANGEROUS",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  stopSequences: ["stop"], // OPTIONAL
});
