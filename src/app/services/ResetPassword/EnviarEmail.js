import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import Voluntario from '../../models/Voluntario';
import Entidade from '../../models/Entidade';
import ResetToken from '../../models/ResetToken';

class EnviarEmail {
  async execute(req, res) {
    const { email } = req.body;
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'alia.hane11@ethereal.email', // generated ethereal user
        pass: 'pprJRknrkXAFykj8E1', // generated ethereal password
      },
    });

    let user = await Voluntario.findOne({ where: { email: email } });

    if (!user) {
      user = await Entidade.findOne({ where: { email: email } });

      if (!user) {
        throw new AppError('Email não cadastrado na aplicaçao');
      }
    }

    const { token } = await ResetToken.create({
      token: uuidv4(),
      user_id: user.id,
      is_used: false,
    });

    const a = await transporter.sendMail({
      from: 'alia.hane11@ethereal.email', // sender address
      to: user.email, // list of receivers
      subject: '[Portal do Voluntariado] Recuperação de senha', // Subject line
      text: `${token}`, // plain text body
      html: `
      <<p>Olá ${user.nome}, seu token para redefinição de senha é: </p>
      <b>${token}</b>`, // html body
    });

    return res.json(token);
  }
}

export default new EnviarEmail();
