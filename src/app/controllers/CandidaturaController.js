import Sequelize from 'sequelize';
import CreateCanditaduraService from '../services/Candidatura/CreateCandidaturaService';
import Candidatura from '../models/Candidatura';
import Necessidade from '../models/Necessidade';
import Voluntario from '../models/Voluntario';
import CandidaturaRepository from '../repositories/CandidaturaRepository';
import AppError from '../../errors/AppError';

class CandidaturaControler {
  async create(req, res) {
    const candidaturaService = new CreateCanditaduraService();
    const data = req.body;

    if (!req.voluntarioId) {
      throw new AppError(
        'Apenas voluntarios podem se canditar as Necessidades',
        401
      );
    }
    Object.assign(data, {
      voluntario_id: req.voluntarioId,
    });

    const createCandidatura = await candidaturaService.execute(data);

    return res.json(createCandidatura);
  }

  async updateStatus(req, res) {
    const { status } = req.body;
    const candidatura_id = req.params.id;

    const findCandidatura = await Candidatura.findByPk(candidatura_id, {
      include: [
        {
          model: Necessidade,
          attributes: ['entidade_id'],
        },
      ],
    });

    if (!findCandidatura) {
      throw new AppError('Candidatura não encontrada', 401);
    }

    if (findCandidatura.Necessidade.entidade_id !== req.entidadeId) {
      throw new AppError(
        'Apenas a entidade dona da Candidatura pode alterar seu status',
        401
      );
    }

    findCandidatura.status = status;

    findCandidatura.save();

    if (status) {
      return res.json('Candidatura aprovada com sucesso');
    } else {
      return res.json('Candidatura rejeitada com sucesso');
    }
  }

  // async get(req, res) {
  //   const { status = null } = req.query;

  //   const candidaturas = await Candidatura.findAll({
  //     where: {
  //       status,
  //     },
  //     include: [
  //       {
  //         model: Necessidade,
  //         attributes: ['id', 'nome', 'entidade_id'],
  //         where: {
  //           entidade_id: req.entidadeId,
  //         },
  //       },
  //       {
  //         model: Voluntario,
  //         attributes: [
  //           'id',
  //           'nome',
  //           'cpf_cnpj',
  //           'email',
  //           'telefone',
  //           'endereco',
  //         ],
  //       },
  //     ],
  //   });

  //   return res.json(candidaturas);
  // }

  async get(req, res) {
    const { status = null } = req.query;

    const candidaturas = await Necessidade.findAll({
      where: {
        entidade_id: req.entidadeId,
      },
      include: [
        {
          model: Candidatura,
          attributes: ['id', 'status', 'voluntario_id'],
          where: {
            status,
          },
          include: [
            {
              model: Voluntario,
              attributes: [
                'id',
                'nome',
                'cpf_cnpj',
                'email',
                'telefone',
                'endereco',
              ],
            },
          ],
        },
      ],
    });

    return res.json(candidaturas);
  }

  async getCandidaturasVoluntario(req, res) {
    const { status = null } = req.query;

    const candidaturas = await Candidatura.findAll({
      where: {
        voluntario_id: req.voluntarioId,
        status,
      },
      include: [
        {
          model: Voluntario,
          attributes: [
            'id',
            'nome',
            'cpf_cnpj',
            'email',
            'telefone',
            'endereco',
          ],
        },
        {
          model: Necessidade,
        },
      ],
    });

    res.json(candidaturas);
  }

  async getCandidaturasVoluntariosEncerradas(req, res) {
    const candidaturas = await Candidatura.findAll({
      where: {
        voluntario_id: req.voluntarioId,
        status: true,
      },
      include: [
        {
          model: Voluntario,
          attributes: [
            'id',
            'nome',
            'cpf_cnpj',
            'email',
            'telefone',
            'endereco',
          ],
        },
        {
          model: Necessidade,
          where: {
            data_fim: { [Sequelize.Op.lte]: new Date() },
          },
        },
      ],
    });

    res.json(candidaturas);
  }

  async delete(req, res) {
    const findCandidatura = await Candidatura.findByPk(candidatura_id);

    if (!findCandidatura) {
      throw new AppError('Candidatura não encontrada', 401);
    }

    if (findCandidatura.entidade_id !== req.entidadeId) {
      throw new AppError(
        'Apenas a entidade dona da Candidatura pode alterar seu status',
        401
      );
    }
    const candidatura = await CandidaturaRepository.delete(req.params.id);

    return res.json(candidatura);
  }
}

export default new CandidaturaControler();
