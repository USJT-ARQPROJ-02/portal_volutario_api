import Sequelize from 'sequelize';
import CreateNecessidadeService from '../services/Necessidade/CreateNecessidadeService';
import UpdateNecessidadeService from '../services/Necessidade/UpdateNecessidadeService';
import NecessidadeRepository from '../repositories/NecessidadeRepository';
import Voluntario from '../models/Voluntario';
import AppError from '../../errors/AppError';
import Necessidade from '../models/Necessidade';
import { getYear } from 'date-fns';

class NecessidadeController {
  async create(req, res) {
    const necessidadeService = new CreateNecessidadeService();
    const data = req.body;
    Object.assign(data, {
      entidade_id: req.entidadeId,
    });
    const createNecessidade = await necessidadeService.execute(data);

    return res.json(createNecessidade);
  }

  async update(req, res) {
    const necessidadeService = new UpdateNecessidadeService();

    const data = { id: req.params.id, updateData: req.body };
    const updateNecessidade = await necessidadeService.execute(data);

    return res.json(updateNecessidade);
  }

  async get(req, res) {
    const necessidade = await NecessidadeRepository.getAll();

    return res.json(necessidade);
  }

  async getEncerradasEntidade(req, res) {
    const findNecessidade = await Necessidade.findAll({
      where: {
        entidade_id: req.entidadeId,
        data_fim: { [Sequelize.Op.lte]: new Date() },
      },
    });

    res.json(findNecessidade);
  }

  async getEncerradasDashboard(req, res) {
    const necessidades = await Necessidade.sequelize.query(
      `SELECT date_trunc('month', necessidades.data_fim) "month", count(*)  FROM public.necessidades group by 1 ORDER BY 1`
    );

    const todayYear = getYear(new Date());

    console.log(todayYear);

    const data = [];
    let _2019 = 0;
    let _2018 = 0;

    for (const necessidade of necessidades[0]) {
      const necessidadeYear = getYear(necessidade.month);
      if (necessidadeYear === todayYear) {
        data.push(necessidade);
      } else {
        if (necessidadeYear === 2019) {
          _2019++;
        } else if (necessidadeYear === 2018) {
          _2018++;
        }
      }
    }

    data.push({ year: 2019, count: _2019 });
    data.push({ year: 2018, count: _2018 });

    return res.json(data);
  }

  async getByPreferences(req, res) {
    const voluntario_id = req.voluntarioId;

    const findVoluntario = await Voluntario.findByPk(voluntario_id);

    if (!findVoluntario) {
      throw new AppError('Erro ao encontrar dados do usuario');
    }

    const helper = [];

    for (let type of findVoluntario.tipo_voluntariado) {
      helper.push({ [Sequelize.Op.eq]: type });
    }

    const findNecessidade = await Necessidade.findAll({
      where: {
        tipo_voluntariado: {
          [Sequelize.Op.or]: helper,
        },
      },
    });

    res.json(findNecessidade);
  }

  async delete(req, res) {
    const necessidade = await NecessidadeRepository.delete(req.params.id);

    return res.json(necessidade);
  }
}

export default new NecessidadeController();
