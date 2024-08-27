import { green, yellow, red, white } from "chalk";

export const db_url: string =
  process.env.DB_URL || "mongodb://localhost:27017/ogit-dev";

export const onDbConnect = () =>
  console.log(
    `${green("[Database]")} ${white("Database connection successful")}`
  );

export const onDbFail = (err: any) => {
  console.log(
    `${red("[Database]")} ${yellow("Database connection failed:")}`,
    err
  );
  process.exit(1);
};
