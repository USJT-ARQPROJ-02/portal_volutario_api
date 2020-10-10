import Candidatura from '../models/candidatura';

class CandidaturaRepository {
  async findById(id) {
    const findCandidatura = await Candidatura.findByPk(id);
    return findCandidatura || null;
  }

  async create(data) {
    const { necessidade_id, voluntario_id } = data;
    console.log(data);
    const createdCandidatura = await Candidatura.create({
      status: true,
      necessidade_id,
      voluntario_id,
    });

    return createdCandidatura;
  }

  async buscarCandidaturasNecessidade(necessidade) {
    const findCandidaturas = await Candidatura.findAll({
      where: {
        necessidade_id: necessidade,
      },
    });

    return findCandidaturas;
  }

  async buscarCandidaturasNecessidade(voluntario) {
    const findCandidaturas = await Candidatura.findAll({
      where: {
        voluntario_id: voluntario,
      },
    });

    return findCandidaturas;
  }
}

export default new CandidaturaRepository();
