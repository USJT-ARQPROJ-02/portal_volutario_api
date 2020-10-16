import { isAfter, addHours } from 'date-fns';
import Voluntario from '../../models/Voluntario';
import Entidade from '../../models/Entidade';
import ResetToken from '../../models/ResetToken';
import AppError from '../../../errors/AppError';

class EnviarEmail {
  async execute(req, res) {
    const { token, senha } = req.body;
    const userToken = await ResetToken.findOne({ where: { token: token } });

    if (!userToken) {
      throw new AppError('Token invalido');
    }

    if (userToken.is_used) {
      throw new AppError('Token já utilizado');
    }

    let user = await Voluntario.findByPk(userToken.user_id);

    if (!user) {
      user = await Entidade.findByPk(userToken.user_id);

      if (!user) {
        throw new AppError('Usuario não encontrado');
      }
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.senha = senha;

    user.save();

    userToken.is_used = true;

    userToken.save();

    return res.json(user);
  }
}

export default new EnviarEmail();
