import exp from "constants";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a password",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Minimum password length is 6 characters",
  }),
  name: z.string().min(1, {
    message: "Please enter a name",
  }),
});
