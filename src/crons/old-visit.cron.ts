import { CronJob } from "cron";

import { EmailEnum } from "../enums/email.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepositories } from "../repositories/user.repositories";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(7, "day");
    const users = await userRepositories.findWithToken(date);
    await Promise.all(
      users.map(async (user) => {
        await emailService.sendMail(EmailEnum.OLD_VISIT, user.email, {
          name: user.name,
        });
      }),
    );
    console.log(`Sent ${users.length} old visit emails`);
  } catch (e) {
    console.error(e);
  }
};

export const OldVisitCronJob = new CronJob("*/5 * * * * *", handler);
