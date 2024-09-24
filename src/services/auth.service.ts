import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser } from "../interfaces/user.interface";
import { tokenRepositories } from "../repositories/token.repositories";
import { userRepositories } from "../repositories/user.repositories";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

type Token = {
  user: IUser;
  tokens: ITokenPair;
};
class AuthService {
  public async register(body: Partial<IUser>): Promise<Token> {
    const password = await passwordService.hashPassword(body.password);
    const user = await userRepositories.create({ ...body, password });

    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepositories.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
  public async login(data: ILogin): Promise<Token> {
    const user = await userRepositories.getByEmail(data.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      data.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid password or email", 401);
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepositories.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
  public async refresh(
    refreshToken: string,
    payload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepositories.deleteByParams({ refreshToken });
    const tokens = tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepositories.create({ ...tokens, _userId: payload.userId });
    return tokens;
  }
}

export const authService = new AuthService();
