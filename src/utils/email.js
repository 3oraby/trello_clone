const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.from = `mohamed eloraby <${process.env.SMTP_FROM}>`;
    this.firstName = user.name.split(" ")[0];
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async send(template, subject) {
    try {
      const html = pug.renderFile(`${__dirname}/../templates/${template}.pug`, {
        name: this.firstName,
        resetUrl: this.url,
        expiresIn: 10,
        subject,
      });
      const text = htmlToText.convert(html);

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        text,
        html,
      };

      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to our app!");
  }

  async sendForgetPassword() {
    await this.send(
      "forget_password",
      "Your password reset token (valid for 10 min)"
    );
  }
};
