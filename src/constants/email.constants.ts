import { EmailEnum } from "../enums/email.enum";

export const emailConstants = {
  [EmailEnum.WELCOME]: {
    subject: "Welcome to our email",
    template: "welcome",
  },
  [EmailEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password",
    template: "forgote password",
  },
};
