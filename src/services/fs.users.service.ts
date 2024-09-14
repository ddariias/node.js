import fs from "node:fs/promises";

import path from "path";

import { IUser } from "../interfaces/user.interface";

const read = async (): Promise<IUser[]> => {
  try {
    const pathUsers = path.join(process.cwd(), "user.json");
    const fail = await fs.readFile(pathUsers, "utf-8");
    return fail ? JSON.parse(fail) : [];
  } catch (e) {
    console.log(e.message);
  }
};
const write = async (users: IUser[]): Promise<void> => {
  try {
    const pathUsers = path.join(process.cwd(), "user.json");
    await fs.writeFile(pathUsers, JSON.stringify(users));
  } catch (e) {
    console.log(e.message);
  }
};

export { read, write };
