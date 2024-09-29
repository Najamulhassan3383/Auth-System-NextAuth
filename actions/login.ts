"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";

export async function loginAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: "Invalid form data",
    };
  }
  const { email, password } = validatedFields.data;
  try {
    console.log(
      "credentials",
      email,
      password,
      "redirect",
      DEFAULT_LOGIN_REDIRECT
    );
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: "Invalid credentials",
          };
        default:
          return {
            errors: "Something went wrong",
          };
      }
    }
    throw error;
  }
}
