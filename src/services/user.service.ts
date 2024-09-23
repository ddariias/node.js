import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepositories } from "../repositories/user.repositories";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepositories.getAll();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepositories.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepositories.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepositories.updateById(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return await userRepositories.deleteById(jwtPayload.userId);
  }
}
export const userService = new UserService();
