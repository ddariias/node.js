import { IUser } from "../interfaces/user.interface";
import { read, write } from "../services/fs.users.service";

class UserRepositories {
  public async getAll(): Promise<IUser[]> {
    return await read();
  }

  public async create(data: Partial<IUser>): Promise<IUser> {
    const users = await read();

    const newUser = {
      id: users.length ? users[users.length - 1]?.id + 1 : 1,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    users.push(newUser);
    await write(users);

    return newUser;
  }

  public async getById(userId: number): Promise<IUser | null> {
    const users = await read();
    return users.find((user) => user.id === userId);
  }

  public async updateById(userId: number, data: IUser): Promise<IUser> {
    const users = await read();
    const user = users.findIndex((user) => user.id === userId);

    users[user].name = data.name;
    users[user].email = data.email;
    users[user].password = data.password;
    await write(users);

    return users[user];
  }
  public async deleteById(userId: number) {
    const users = await read();
    const user = users.findIndex((user) => user.id === userId);

    users.splice(user, 1);
    await write(users);
  }
}
export const userRepositories = new UserRepositories();
