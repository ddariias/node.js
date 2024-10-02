import { EmailEnum } from "../enums/email.enum";
import { EmailPayloadCombinedType } from "./email-payload-combined-type";
import { PickRequired } from "./pick-required-type";

export type EmailTypePayload = {
  [EmailEnum.WELCOME]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "actionToken"
  >;
  [EmailEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombinedType,
    "name" | "email" | "actionToken"
  >;
  [EmailEnum.OLD_VISIT]: PickRequired<EmailPayloadCombinedType, "name">;
};
