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

export async function loginAction(prevState: State, formdata: FormData) {
  const validatedValues = LoginSchema.safeParse({
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  });

  if (!validatedValues.success) {
    return {
      errors: validatedValues.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User",
      success: false,
    };
  }
  try {
    
  } catch (error) {
    return {
      errors: {},
      message: "Login Failed",
      success: false
    
  }

  console.log("Login Action", validatedValues.data);
  return {
    errors: {},
    message: "Login Successful",
    success: true,
  };
}
