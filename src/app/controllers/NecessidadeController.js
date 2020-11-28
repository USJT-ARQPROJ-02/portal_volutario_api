import Sequelize from 'sequelize';
import CreateNecessidadeService from '../services/Necessidade/CreateNecessidadeService';
import UpdateNecessidadeService from '../services/Necessidade/UpdateNecessidadeService';
import NecessidadeRepository from '../repositories/NecessidadeRepository';
import Voluntario from '../models/Voluntario';
import AppError from '../../errors/AppError';
import Necessidade from '../models/Necessidade';
import { getYear, parseISO } from 'date-fns';

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
    const { id } = req.params;

    const files = req.files;

    const findNecessidade = await Necessidade.findByPk(id);

    if (!findNecessidade) {
      throw new AppError('Necessidade não encontrada');
    }

    let helperFiles;

    if (!findNecessidade.images) {
      helperFiles = [];
    } else {
      helperFiles = findNecessidade.images;
    }

    for (let file of files) {
      helperFiles.push(file.filename);
    }

    findNecessidade.images = helperFiles;
    findNecessidade.feedback = req.body.feedback;
    findNecessidade.status = false;

    await findNecessidade.save();

    return res.json(findNecessidade);
  }

  async get(req, res) {
    const necessidade = await NecessidadeRepository.getAll();

    return res.json(necessidade);
  }

  async getEncerradas(req, res) {
    const findNecessidade = await Necessidade.findAll({
      where: {
        status: false,
      },
    });

    res.json(findNecessidade);
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
    const date = new Date().toLocaleString();
    console.log(date);
    const necessidades = await Necessidade.sequelize.query(
      `SELECT date_trunc('month', necessidades.data_fim) "month", count(*) FROM public.necessidades where data_fim < '${date}' group by 1 ORDER BY 1`
    );

    const todayYear = getYear(new Date());

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

  async getMyEntidade(req, res) {
    const { id = req.entidadeId } = req.params;
    const response = await Necessidade.findAll({
      where: {
        entidade_id: id,
      },
    });

    return res.json(response);
  }

  async delete(req, res) {
    const necessidade = await NecessidadeRepository.delete(req.params.id);

    return res.json(necessidade);
  }
}

export default new NecessidadeController();
