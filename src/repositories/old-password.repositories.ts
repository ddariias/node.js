import { FilterQuery } from "mongoose";

import { IOldPassword } from "../interfaces/old-password.interface";
import { OldPassword } from "../models/old-password.model";

class OldPasswordRepositories {
  public async create(data: IOldPassword): Promise<IOldPassword> {
    return await OldPassword.create(data);
  }
  public async findByParams(userId: string): Promise<IOldPassword[]> {
    return await OldPassword.find({ userId });
  }
  public async deleteManyByParams(
    params: FilterQuery<IOldPassword>,
  ): Promise<number> {
    const { deletedCount } = await OldPassword.deleteOne(params);
    return deletedCount;
  }
}
export const oldPasswordRepositories = new OldPasswordRepositories();
