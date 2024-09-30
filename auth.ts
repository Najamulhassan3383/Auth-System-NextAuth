import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/db_utils/user";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      role: "user" | "admin" | null;
    } & DefaultSession["user"];
  }
  interface User {
    role: "user" | "admin" | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GitHub,
    Credentials({
      authorize: async (credentials, request) => {
        const validatedCredentials = LoginSchema.safeParse(credentials);
        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.role = user.role;
      }
      console.log("token", token);
      return token;
    },
    session({ session, token }) {
      console.log("session", session);
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      return session;
    },
  },
});
