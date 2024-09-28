"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function loginAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: "Invalid form data",
    };
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false,
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

    return {
      errors: "An unexpected error occurred",
    };
  }

  redirect("/");
}
