import dayjs from "dayjs";
import User from "@/entities/User";
import sgMail from "@sendgrid/mail";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";

export async function createNewUser(email: string, password: string) {
  const settings = await Setting.getEventSettings();

  if (dayjs().isBefore(dayjs(settings.startDate))) {
    throw new CannotEnrollBeforeStartDateError();
  }

  const user = await User.createNew(email, password);
  return user;
}

export async function resetPassword(email: string) {
  const isEnrolled = await User.isEmailRegistered(email);

  if(isEnrolled) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Alteração da senha Drivent",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail.send(msg);
  }
}
