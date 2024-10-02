import { model, Schema } from "mongoose";

import { IOldPassword } from "../interfaces/old-password.interface";
import { User } from "./user.model";

const oldPasswordSchema = new Schema(
  {
    password: { type: String, require: true },
    _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OldPassword = model<IOldPassword>(
  "old-password",
  oldPasswordSchema,
);
