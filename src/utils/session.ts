import { cacheClient } from "@/cache";

export async function setUserSession(userId: number, token: string) {
  cacheClient().set(`${userId}token`, token);
}
