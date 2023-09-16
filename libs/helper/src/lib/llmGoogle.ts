import { GooglePaLM } from "langchain/llms/googlepalm";

export const llmGoogle = new GooglePaLM({
  temperature: 0.9,
  maxOutputTokens: 1024,
  topK: 30,
  topP: 1,
  safetySettings: [
    {
      category: "HARM_CATEGORY_DANGEROUS",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  // stopSequences: ["stop"],
});
