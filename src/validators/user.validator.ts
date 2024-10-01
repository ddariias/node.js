import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  private static name = joi.string().min(3).max(33).trim();
  private static age = joi.number().min(0).max(130);
  private static email = joi
    .string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL);
  private static password = joi.string().trim().regex(regexConstant.PASSWORD);

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  public static update = joi.object({
    name: this.name,
    age: this.age,
  });

  public static changePassword = joi.object({
    oldPassword: this.password.required(),
    password: this.password.required(),
  });
}
