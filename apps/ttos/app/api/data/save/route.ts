import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

// const SQLcreate_one_shots = sql`CREATE TABLE one_shots (
//     id bigint NOT NULL PRIMARY KEY,
//     name varchar(255),
//     context TEXT,
//     overview_data jsonb,
//     chat_history jsonb,
//     user_id bigint NOT NULL,
//     email  varchar(255),
//     date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     date_updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
//   );`

export const POST = async (req: NextRequest, res: NextResponse) => {
  const {id, name, context, overviewData, chatHistory} = await req.json();
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    if(id) {
      // update
      const result = await sql`UPDATE one_shots
      SET name = '${name}',
        context = '${context}',
        overview_data = '${overviewData}',
        chat_history = '${chatHistory}',
        date_updated = NOW()
      WHERE email = '${email}' AND id = ${id};`;
      console.log("result", result);
    } else {
      // insert
      const result = await sql`INSERT INTO one_shots (name, context, overview_data, chat_history, email, date_created)
      VALUES('${name}', '${context}', '${overviewData}', '${chatHistory}', '${email}', NOW())`;
      console.log("result", result);
    }
    const result = await sql`SELECT * FROM one_shots`;
    console.log("result", result);
    return NextResponse.json({ message: "yay!" }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error saving session", error }, { status: 500 });
  }
};
