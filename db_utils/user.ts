import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schemas";

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  } catch (error) {
    return null;
  }
}
