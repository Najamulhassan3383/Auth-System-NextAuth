"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export async function RegisterAction(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: "Invalid form data",
    };
  }

  console.log("Registering user with data: ", validatedFields);
  return {
    message: "Successfull",
  };
}
