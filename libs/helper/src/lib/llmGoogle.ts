import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const llmGoogleCreative = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  temperature: 1,
  maxOutputTokens: 128,
  topK: 20,
  topP: .5,
});

export const llmGoogleStrict = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  temperature: 0.6,
  maxOutputTokens: 2048,
  topK: 10,
  topP: 1,
});

export const llmGoogle = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  temperature: 0.9,
  maxOutputTokens: 2048,
  topK: 30,
  topP: 1,
});
