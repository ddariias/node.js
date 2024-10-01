import { CronJob } from "cron";

class TestCron {
  public static async run() {
    console.log("TestCron");
  }
}

export const testCronJob = new CronJob("0,20,40 * * * * *", TestCron.run);
