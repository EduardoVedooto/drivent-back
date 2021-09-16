import dayjs from "dayjs";
import User from "@/entities/User";
import sgMail from "@sendgrid/mail";
import { v4 as uuid } from "uuid";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";
import requestNewPassword from "@/entities/RequestNewPassword";

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
    const token = uuid();
    await requestNewPassword.insert({ email, token });
    const html = `
      <h1>Olá, somos o suporte da Drivent</h1>
      <h3>
        <strong>
          Vimos que você solicitou a alteração de sua senha cadastrada. <br />
          Para continuar com o processo de alteração cadastral, acesse o link abaixo.
        </strong>
      </h3><br />
      <a href="${process.env.CLIENT_BASE_URL}/reset-password/${token}">Clique aqui</a><br /><br />
      <span>Caso não tenha sido você, desconsidere este email!</span>
    `;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Alteração da senha Drivent",
      html
    };
    sgMail.send(msg);
  }
}

export async function saveNewPassword(password: string, token: string) {
  const email = await requestNewPassword.getEmailByToken(token);
  return await User.updatePassword(email, password);
}
