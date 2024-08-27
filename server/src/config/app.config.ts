import { green, yellow, white, blue } from "chalk";

export const port: number = process.env.PORT ? Number(process.env.PORT) : 3001;
export const api_url: string = process.env.API_URL
  ? `/${process.env.API_URL}`
  : "/api";

export const onServerListen = () =>
  console.log(
    `${green("[Server]")} ${white("Now listening for requests at")} ${yellow(
      "http://localhost:"
    )}${blue(port)}`
  );
