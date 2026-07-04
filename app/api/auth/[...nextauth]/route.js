import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("ENV CHECK:", {
  hasSecret: !!process.env.NEXTAUTH_SECRET,
  hasUrl: !!process.env.NEXTAUTH_URL,
  hasClientId: !!process.env.GOOGLE_CLIENT_ID,
  hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
});


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };