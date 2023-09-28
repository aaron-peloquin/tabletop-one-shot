import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;
    const result = await sql`SELECT id, name, context, date_created, date_updated FROM one_shots WHERE email = ${email}`;
    return NextResponse.json({ message: "ok", saves: result.rows, count: result.rowCount }, { status: 200 });
  } catch(error) {
    console.error('save error', error);
    return NextResponse.json({ message: "error listing sessions", error }, { status: 500 });
  }
};
