import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  role: RoleEnum;
}
