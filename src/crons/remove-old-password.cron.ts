import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepositories } from "../repositories/old-password.repositories";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(90, "day");
    const deleteCount = await oldPasswordRepositories.deleteManyByParams({
      createdAt: { $lt: date },
    });
    console.log(`Deleted ${deleteCount} old passwords`);
  } catch (e) {
    console.error(e);
  }
};

export const removeOldPasswordsCronJob = new CronJob("20 * * * * *", handler);
