import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action.token.model";

class ActionTokenRepositories {
  public async create(data: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(data);
  }
  public async getByToken(token: string): Promise<IActionToken | null> {
    return await ActionToken.findOne({ token });
  }
  public async deleteManyByParams(
    params: Partial<IActionToken>,
  ): Promise<void> {
    await ActionToken.deleteMany(params);
  }
}

export const actionTokenRepositories = new ActionTokenRepositories();
