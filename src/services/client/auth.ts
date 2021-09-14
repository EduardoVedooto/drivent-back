import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import { createToken } from "@/utils/app";
import { cacheClient } from "@/cache";

export async function setUserSession(userId: number, token: string) {
  cacheClient().set(`${userId}token`, token);
}

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = createToken(user.id);
  await setUserSession(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email,
    },

    token,
  };
}
