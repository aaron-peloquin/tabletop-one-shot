import { GooglePaLM } from "langchain/llms/googlepalm";

export const llmGoogleCreative = new GooglePaLM({
  temperature: 0.6,
  maxOutputTokens: 128,
  topK: 20,
  topP: .5,
  safetySettings: [
    {
      category: "HARM_CATEGORY_DANGEROUS",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  // stopSequences: ["stop"],
});

export const llmGoogleStrict = new GooglePaLM({
  temperature: 1,
  maxOutputTokens: 2048,
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

export const llmGoogle = new GooglePaLM({
  temperature: 0.9,
  maxOutputTokens: 2048,
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
