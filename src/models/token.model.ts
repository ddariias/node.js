import { model, Schema } from "mongoose";

import { IToken } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: { type: String, require: true },
    refreshToken: { type: String, require: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<IToken>("tokens", tokenSchema);
