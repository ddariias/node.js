import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../config/configs";
import { ActionTokenEnum } from "../enums/action-token.enum";
import { TokenTypeEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      {
        expiresIn: configs.JWT_REFRESH_EXPIRATION,
      },
    );

    return { accessToken, refreshToken };
  }
  public verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;

        case TokenTypeEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;
        case ActionTokenEnum.FORGOT_PASSWORD:
          secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
          break;

        case ActionTokenEnum.VERIFY_EMAIL:
          secret = configs.ACTION_VERIFY_EMAIL_SECRET;
          break;
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      console.error(e.message);
      throw new ApiError("Invalid token", 401);
    }
  }
  public generateActionToken(
    payload: ITokenPayload,
    type: ActionTokenEnum,
  ): string {
    let secret: string;
    let expiration: string;

    switch (type) {
      case ActionTokenEnum.FORGOT_PASSWORD:
        secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
        expiration = configs.ACTION_FORGOT_PASSWORD_EXPIRATION;
        break;
      case ActionTokenEnum.VERIFY_EMAIL:
        secret = configs.ACTION_VERIFY_EMAIL_SECRET;
        expiration = configs.ACTION_VERIFY_EMAIL_EXPIRATION;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }
    const token = jsonwebtoken.sign(payload, secret, { expiresIn: expiration });

    return token;
  }
}
export const tokenService = new TokenService();
