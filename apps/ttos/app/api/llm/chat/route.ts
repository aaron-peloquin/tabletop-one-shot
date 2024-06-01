import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  maxOutputTokens: 2048,
});

export const POST = async (req: NextRequest) => {
  const params = await req.json();
  try {
    const history = (params.history || []) as {role: 'human'|'ai', message: string}[];
    const chatHistory = history.map(({role, message}) => {
      if (role==="human") {
        return new HumanMessage(message);
      }
      return new AIMessage(message);
    });
    const chatMessages = [
      new SystemMessage(
        "A helpful game master (AI Assistant) has created the following one-shot session for a tabletop game. Another dungeon master (Human) will be asking chatMessages about this session, and the game master will reply with short succinct answers. The One-shot session details in JSON format:" +
        "```session-overview.json" +
         JSON.stringify(params.overview) +
         "```"
      ),
      ...chatHistory,
      new HumanMessage(params.human),
    ];
  
    const response = await model.invoke(chatMessages);
    return NextResponse.json({ message: response.content }, { status: 200 });
  } catch (errorReason) {
    console.error(errorReason);
    return NextResponse.json({ error: 'Unable to generate chat reply, please try again', errorReason },  {status: 500 });
  }
};
