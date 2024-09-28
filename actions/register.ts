"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schemas";
import { getUserByEmail } from "@/db_utils/user";

export async function RegisterAction(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: "Invalid form data",
    };
  }

  const { email, name, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  //check if email is not taken
  // Assuming your user table is named 'users' in your schema definition
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      errors: "Email already taken",
    };
  }

  await db.insert(users).values({
    email,
    name,
    password: hashedPassword,
  });

  console.log("Registering user with data: ", validatedFields);
  return {
    success: "User registered successfully",
  };
}
