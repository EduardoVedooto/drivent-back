import faker from "faker";
import jwt from "jsonwebtoken";

import User from "@/entities/User";
import { createCacheClient, cacheClient } from "@/cache";
import { WrappedNodeRedisClient } from "handy-redis";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: "123456",
  });

  await user.save();
  return user;
}

export async function createSession(userId: number) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  const session = {
    userId,
    token,
  };

  await createCacheClient();
  const client: WrappedNodeRedisClient = cacheClient();
  await client.set(`${userId}token`, token);

  return session;
}
