import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };

export async function GET() {
  const result = await db.send(new ScanCommand({
    TableName: "Users",
    Limit: 1,
  }));
  return Response.json({ success: true, result });
}