import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/db_utils/user";
import GitHub from "next-auth/providers/github";
import { db } from "./lib/db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      authorize: async (credentials) => {
        let user = null;
        const validatedCredentials = LoginSchema.safeParse(credentials);
        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data;
          user = await getUserByEmail(email);

          if (!user || !user.password) {
            console.log("User not found or password not set");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            console.log("User authenticated");
            return user;
          }
        }
        console.log("invalid credentials");
        return null;
      },
    }),
  ],
});
