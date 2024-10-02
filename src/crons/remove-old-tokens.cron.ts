import { CronJob } from "cron";

import { configs } from "../config/configs";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepositories } from "../repositories/token.repositories";

const handler = async () => {
  const { value, unit } = timeHelper.parseConfigString(
    configs.JWT_REFRESH_EXPIRATION,
  );

  const date = timeHelper.subtractByParams(value, unit);
  console.log(date);
  const deleteCount = await tokenRepositories.deleteBeforeDate(date);
  console.log(`Deleted ${deleteCount}`);
};

export const removeOldTokensCronJob = new CronJob("* 1 * * 9 *", handler);
