import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepositories {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data)
  }

  public async getById(userId: string): Promise<IUser | null> {
    return {} as IUser;
  }

  public async updateById(userId: string, data: IUser): Promise<IUser> {
    return {} as IUser;
  }
  public async deleteById(userId: string) {}
}
export const userRepositories = new UserRepositories();
