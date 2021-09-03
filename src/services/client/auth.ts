import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";
import { createToken } from "@/utils/app";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = createToken(user.id);

  await Session.createNew(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email
    },

    token
  };
}
