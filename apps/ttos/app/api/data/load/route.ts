import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const result = await sql`SELECT id, name, context, party_level, date_created, date_updated FROM one_shots WHERE email = ${email}`;
    return NextResponse.json({ message: "ok", saves: result.rows, count: result.rowCount }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error listing sessions", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const postedArgs = await req.json();
  const {saveId} = postedArgs;
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const result = await sql`SELECT id, name, context, party_level, overview_data, chat_history FROM one_shots WHERE email = ${email} AND id = ${saveId}`;
    return NextResponse.json({ message: "ok", data: result.rows?.[0] || {} }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error loading sessions", error }, { status: 500 });
  }
};
  