import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: RoleEnum;
}

export type ILogin = Pick<IUser, "email" | "password">;

export type IForgotPassword = Pick<IUser, "email">;

export type IForgotPasswordSet = Pick<IUser, "password"> & { token: string };
