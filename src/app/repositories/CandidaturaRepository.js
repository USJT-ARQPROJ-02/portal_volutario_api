import Candidatura from '../models/candidatura';

class CandidaturaRepository {

  async findById(id) {
    const findCandidatura = await Candidatura.findByPk(id);
    return findCandidatura || null;
  }

  async create(data) {
    const { necessidade, voluntario, data, aprovado} = data;
    const createdCandidatura = await Candidatura.create({
        data,
        aprovado,
        necessidade,
        voluntario
    });

    return createdCandidatura;
  }

  async getAllByNecessidade(id_necessidade) {
    const findCandidaturas = await Candidatura.findAll({
        where: {
            necessidade : id_necessidade
        }
    });

    return findCandidaturas;
  }

}

export default new CandidaturaRepository();
