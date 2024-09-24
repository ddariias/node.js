import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { configs } from "../config/configs";
import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";
import {EmailTypePayload} from "../types/email-type-payload";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.MY_EMAIL,
        pass: configs.MY_PASSWORD,
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        defaultLayout: "main",
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendMail<T extends EmailEnum>(
    to: string,
    type: T,
    context: EmailTypePayload[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type];
    const options = { to, subject, template, context };
    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
