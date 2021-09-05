import faker from "faker";

import User from "@/entities/User";
import Session from "@/entities/Session";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456"
  });

  await user.save();
  return user;
}

export async function createSession(userId: number) {
   const session = Session.create({
    userId,
    token: "fakeToken123456#%&&",
  });

  await session.save();

  return session;
}