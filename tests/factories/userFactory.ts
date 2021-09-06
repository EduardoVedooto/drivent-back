import faker from "faker";
import jwt from "jsonwebtoken";

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
  const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET);

   const session = Session.create({
    userId,
    token
  });

  await session.save();

  return session;
}