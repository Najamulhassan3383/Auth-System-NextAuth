"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function loginAction(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: "Invalid form data",
    };
  }

  return {
    message: "Successfull",
  };
}
