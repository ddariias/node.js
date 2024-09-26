import { model, Schema } from "mongoose";

import { ActionTokenEnum } from "../enums/action-token.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { User } from "./user.model";

const actionTokenSchema = new Schema({
  token: { type: String, required: true },
  type: { type: String, required: true, enum: ActionTokenEnum },
  _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
});

export const ActionToken = model<IActionToken>("atokens", actionTokenSchema);
