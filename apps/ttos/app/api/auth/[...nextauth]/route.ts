import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GOOGLE_ID || '';
const clientSecret = process.env.GOOGLE_SECRET || '';

const handler = NextAuth({
  providers: [ GoogleProvider({ clientId, clientSecret }) ]
});

export { handler as GET, handler as POST };
