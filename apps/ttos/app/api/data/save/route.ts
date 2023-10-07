import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

// const SQLcreate_one_shots = sql`CREATE TABLE one_shots (
//   id bigint NOT NULL PRIMARY KEY,
//   name varchar(255),
//   context TEXT,
//   overview_data jsonb,
//   chat_history jsonb,
//   user_id bigint,
//   email varchar(255),
//   date_created timestamp,
//   party_level varchar(50)
// );`;

/**
 * Note: SQL Injection protection done by vercel
 * https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
  const postedArgs = await req.json();
  const {saveId, name, context, overview, history, partyLevel} = postedArgs;
  let responseId = saveId;
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const overviewData = JSON.stringify(overview);
    const chatHistory = JSON.stringify(history);
    if(saveId) {
      // update
      await sql`UPDATE one_shots
      SET name = ${name},
        context = ${context},
        overview_data = ${overviewData},
        chat_history = ${chatHistory},
        party_level = ${partyLevel}
      WHERE email = ${email}
        AND id = ${saveId};`;
    } else {
      // insert
      await sql`INSERT INTO one_shots (name, context, overview_data, chat_history, email, date_created)
      VALUES (${name}, ${context}, ${overviewData}, ${chatHistory}, ${email}, NOW());`;
      const queryResult = await sql`SELECT MAX(id) as new_id from one_shots where email=${email}`;
      responseId = queryResult.rows[0].new_id;
    }
    return NextResponse.json({ message: {saveId: responseId} }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error saving session", error }, { status: 500 });
  }
};
