import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByEmail } from "@/db_utils/user";
import GitHub from "next-auth/providers/github";
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if the user exists
        user = await getUserByEmail(credentials.email as string);

        if (!user) {
          throw new Error("User not found.");
        }
        const isValidPassword = await compare(
          credentials.password as string,
          user.password as string
        );
        if (!isValidPassword) {
          throw new Error("Invalid password.");
        }
        return user;
      },
    }),
  ],
});
