import { ActionTokenEnum } from "../enums/action-token.enum";
import { EmailEnum } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IForgotPassword,
  IForgotPasswordSet,
  ILogin,
  IUser,
} from "../interfaces/user.interface";
import { actionTokenRepositories } from "../repositories/action-token.repositories";
import { oldPasswordRepositories } from "../repositories/old-password.repositories";
import { tokenRepositories } from "../repositories/token.repositories";
import { userRepositories } from "../repositories/user.repositories";
import { emailService } from "./email.service";
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

    const token = tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenEnum.VERIFY_EMAIL,
    );
    await actionTokenRepositories.create({
      type: ActionTokenEnum.VERIFY_EMAIL,
      _userId: user._id,
      token,
    });

    await emailService.sendMail(EmailEnum.WELCOME, user.email, {
      name: user.name,
      actionToken: token,
    });
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
  public async forgotPasswordSendEmail(data: IForgotPassword): Promise<void> {
    const user = await userRepositories.getByEmail(data.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const token = tokenService.generateActionToken(
      { userId: user._id, role: user.role },
      ActionTokenEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepositories.create({
      type: ActionTokenEnum.FORGOT_PASSWORD,
      _userId: user._id,
      token,
    });
    await emailService.sendMail(
      EmailEnum.FORGOT_PASSWORD,
      "dashadidyk41@gmail.com",
      {
        name: user.name,
        email: user.email,
        actionToken: token,
      },
    );
  }
  public async forgotPasswordSetNew(
    data: IForgotPasswordSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const password = await passwordService.hashPassword(data.password);
    await userRepositories.updateById(jwtPayload.userId, {
      password,
    });

    await actionTokenRepositories.deleteManyByParams({
      type: ActionTokenEnum.FORGOT_PASSWORD,
      _userId: jwtPayload.userId,
    });
    await tokenRepositories.deleteByParams({ _userId: jwtPayload.userId });
  }
  public async verify(jwtPayload: ITokenPayload): Promise<void> {
    await userRepositories.updateById(jwtPayload.userId, {});
    await actionTokenRepositories.deleteManyByParams({
      type: ActionTokenEnum.VERIFY_EMAIL,
      _userId: jwtPayload.userId,
    });
  }
  public async changePassword(
    jwtPayload: ITokenPayload,
    data: IChangePassword,
  ): Promise<void> {
    const [user, oldPassword] = await Promise.all([
      userRepositories.getById(jwtPayload.userId),
      oldPasswordRepositories.findByParams(jwtPayload.userId),
    ]);
    const isPasswordCorect = await passwordService.comparePassword(
      data.oldPassword,
      user.password,
    );
    if (!isPasswordCorect) {
      throw new ApiError("Invalid password", 400);
    }

    const passwords = [...oldPassword, { password: user.password }];
    await Promise.all(
      passwords.map(async (oldPassword) => {
        const isPrevius = await passwordService.comparePassword(
          data.password,
          oldPassword.password,
        );
        if (isPrevius) {
          throw new ApiError("Password already used", 409);
        }
      }),
    );
    const password = await passwordService.hashPassword(data.password);
    await userRepositories.updateById(jwtPayload.userId, { password });
    await oldPasswordRepositories.create({
      _userId: jwtPayload.userId,
      password: user.password,
    });
    await tokenRepositories.deleteByParams({ _userId: jwtPayload.userId });
  }
}

export const authService = new AuthService();
