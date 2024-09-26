import { ActionTokenEnum } from "../enums/action-token.enum";

export interface IActionToken {
  token: string;
  type: ActionTokenEnum;
  _userId: string;
  _id?: string;
}
