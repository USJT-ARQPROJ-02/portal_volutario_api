import Sequelize from 'sequelize';
import CreateNecessidadeService from '../services/Necessidade/CreateNecessidadeService';
import UpdateNecessidadeService from '../services/Necessidade/UpdateNecessidadeService';
import NecessidadeRepository from '../repositories/NecessidadeRepository';
import Voluntario from '../models/Voluntario';
import AppError from '../../errors/AppError';
import Necessidade from '../models/Necessidade';
import { or } from 'sequelize';
import { he } from 'date-fns/locale';

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

  async getByPreferences(req, res) {
    const voluntario_id = req.voluntarioId;

    console.log(voluntario_id);

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
