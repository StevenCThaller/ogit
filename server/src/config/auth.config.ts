export const jwt_secret: string =
  process.env.JWT_SECRET || "supersecretkeyoops";

export const hash_rounds: number = process.env.HASH_ROUNDS
  ? Number(process.env.HASH_ROUNDS)
  : 10;
