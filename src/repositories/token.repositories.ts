import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepositories {
  public async create(data: Partial<IToken>): Promise<IToken> {
    return await Token.create(data);
  }
  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }

  public async deleteByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}
export const tokenRepositories = new TokenRepositories();
