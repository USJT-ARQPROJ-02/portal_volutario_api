import jwt from 'jsonwebtoken';
import Voluntario from '../models/Voluntario';
import Entidade from '../models/Entidade';

class SessionController {
  async loginVoluntario(req, res) {
    const { email, senha } = req.body;

    const voluntario = await Voluntario.findOne({ where: { email } });

    if (!voluntario) {
      return res.status(401).json({ error: 'Voluntario nao encontrado' });
    }

    if (!(await voluntario.checkPassword(senha))) {
      return res.status(401).json({ error: 'Erro de senha' });
    }

    const { id, nome } = voluntario;

    return res.json({
      user: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, 'palavrasecreta', {
        expiresIn: '20d',
      }),
    });
  }

  async loginEntidade(req, res) {
    const { email, senha } = req.body;

    const entidade = await Entidade.findOne({ where: { email } });

    if (!entidade) {
      return res.status(401).json({ error: 'Entidade nao encontrado' });
    }

    if (!(await entidade.checkPassword(senha))) {
      return res.status(401).json({ error: 'Erro de senha' });
    }

    const { id, nome } = entidade;

    return res.json({
      entidade: true,
      user: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, 'palavrasecreta', {
        expiresIn: '20d',
      }),
    });
  }
}

export default new SessionController();
