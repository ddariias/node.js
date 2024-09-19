import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepositories } from "../repositories/user.repositories";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepositories.getAll();
  }
  public async create(data: Partial<IUser>) {
    return await userRepositories.create(data);
  }
  public async getById(userId: string): Promise<IUser> {
    const user = await userRepositories.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async updateById(userId: string, data: IUser): Promise<IUser> {
    return await userRepositories.updateById(userId, data);
  }
  public async deleteById(userId: string) {
    return await userRepositories.deleteById(userId);
  }
}

export const userService = new UserService();
