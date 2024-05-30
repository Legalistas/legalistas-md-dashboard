import { createHash } from "crypto";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const md5 = (str: string): string =>
  createHash("md5").update(str).digest("hex");
