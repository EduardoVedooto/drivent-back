import jwt from "jsonwebtoken";

export function createToken(userId: number) {
  const token = jwt.sign(
    {
      userId
    },
    process.env.JWT_SECRET
  );
  return token;
}
