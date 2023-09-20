import { NextRequest, NextResponse } from "next/server";
import { ChatGooglePaLM } from "langchain/chat_models/googlepalm";
import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

const model = new ChatGooglePaLM({
  examples: [
    {
      input: new HumanMessage("What treasure might the goblins have?"),
      output: new AIMessage("4 gold, leather armor, and a chipped short sword"),
    },
    {
      input: new HumanMessage("Tell me more about the trap in the 2nd encounter"),
      output: new AIMessage("Sure, its a greased slide trap. When the trap's tripwire is activated, grease falls from the ceiling and the floor turns into a slide. Players may make a DC 14 Dexterity save or slide helplessly into the 3rd encounter where the player(s) will be surprised"),
    },
    {
      input: new HumanMessage("How many bandit swashbucklers would be appropriate for the fight?"),
      output: new AIMessage("Two or three"),
    },
    {
      input: new HumanMessage("Tell me more about the magic ring"),
      output: new AIMessage("Its a Ring of Jumping (Ring, uncommon, requires attunement). While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so."),
    },
  ],
});

export const POST = async (req: NextRequest) => {
  const params = await req.json();

  try {
    const history = (params.history || []) as {role: 'human'|'ai', message: string}[];
    const chatHistory = history.map(({role, message}) => {
      if(role==="human") {
        return new HumanMessage(message);
      }
      return new AIMessage(message);
    });
    const questions = [
      new SystemMessage(
        "A helpful game master has created up with the following one-shot session for a tabletop game. Another dungeon master will be asking you questions about this session. One-shot details in JSON format:" +
        "```session-overview.json" +
         JSON.stringify(params.overview) +
         "```"
      ),
      ...chatHistory,
      new HumanMessage(params.human),
    ];
  
    const response = await model.call(questions);
    return NextResponse.json({ message: response.content }, { status: 200 });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ error: 'Unable to generate chat reply, please try again' },  {status: 500 });
  }
};
