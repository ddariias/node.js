import { removeOldPasswordsCronJob } from "./remove-old-password.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { testCronJob } from "./test.cron";
import {OldVisitCronJob} from "./old-visit.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  OldVisitCronJob.start();
};
