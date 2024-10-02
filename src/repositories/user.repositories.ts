import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import {Token} from "../models/token.model";

class UserRepositories {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
  }

  public async getById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("+password");
  }
  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }
  public async findWithToken(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
            { $match: { createdAt: { $gt: date } } },
          ],
          as: "tokens",
        },
      },
      { $match: { tokens: { $size: 0 } } },
    ]);
  }

  public async updateById(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  }
  public async deleteById(userId: string) {
    await User.deleteOne({ _id: userId });
  }
}
export const userRepositories = new UserRepositories();
