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
  public async getById(userId: number): Promise<IUser> {
    const user = await userRepositories.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async updateById(userId: number, data: IUser): Promise<IUser> {
    if (!data.name || data.name.length < 2) {
      throw new ApiError("User name should be more than 2 symbols", 400);
    }
    if (!data.email.includes("@")) {
      throw new ApiError("Email should be contain @", 400);
    }
    if (!data.password) {
      throw new ApiError("Password should be ", 400);
    }
    return await userRepositories.updateById(userId, data);
  }
  public async deleteById(userId: number) {
    return await userRepositories.deleteById(userId);
  }
}

export const userService = new UserService();
