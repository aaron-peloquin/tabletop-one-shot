import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';

export const maxDuration = 40;

const onFailedAttempt = () => { console.log('a chat generation attempt failed'); };

const chatChain = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  maxOutputTokens: 2048,
}).withRetry({
  stopAfterAttempt: 3,
  onFailedAttempt,
});

export const POST = async (req: NextRequest) => {
  const params = await req.json();
  try {
    const systemMessage = new SystemMessage(
      "A helpful game master (AI Assistant) has created the following one-shot session for a tabletop game. Another dungeon master (Human) will be asking chatMessages about this session, and the game master will reply with short succinct answers. The One-shot session details in JSON format:" +
      "```session-overview.json" +
       JSON.stringify(params.overview) +
       "```"
    );
    const history = (params.history || []) as {role: 'human'|'ai', message: string}[];
    const chatHistory = history.map(({role, message}) => {
      if (role==="human") {
        return new HumanMessage(message);
      }
      return new AIMessage(message);
    });

    const chatMessages = [
      systemMessage,
      ...chatHistory,
      new HumanMessage(params.human),
    ];
  
    const response = await chatChain.invoke(chatMessages);
    return NextResponse.json({ message: response.content }, { status: 200 });
  } catch (errorReason) {
    console.error(errorReason);
    return NextResponse.json({ error: 'Unable to generate chat reply, please try again', errorReason },  {status: 500 });
  }
};
