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
//   );`;

/**
 * Note: SQL Injection protection done by vercel
 * https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
  const postedArgs = await req.json();
  // console.log('postedArgs', postedArgs);
  const {saveId, name, context, overview, history} = postedArgs;
  let responseId = saveId;
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const overviewData = JSON.stringify(overview);
    const chatHistory = JSON.stringify(history);
    if(saveId) {
      // update
      const result = await sql`UPDATE one_shots
      SET name = ${name},
        context = ${context},
        overview_data = ${overviewData},
        chat_history = ${chatHistory},
        date_updated = NOW()
      WHERE email = ${email}
        AND id = ${saveId};`;
      console.log("result", result);
    } else {
      // insert
      await sql`INSERT INTO one_shots (name, context, overview_data, chat_history, email, date_created)
      VALUES (${name}, ${context}, ${overviewData}, ${chatHistory}, ${email}, NOW());`;
      const queryResult = await sql`SELECT MAX(id) as new_id from one_shots where email=${email}`;
      responseId = queryResult.rows[0].new_id;
      console.log('responseId', responseId);
    }
    return NextResponse.json({ message: "save complete", saveId: responseId }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error saving session", error }, { status: 500 });
  }
};
