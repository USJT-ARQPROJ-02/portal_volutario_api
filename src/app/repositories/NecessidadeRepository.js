import Necessidade from '../models/Necessidade';

class NecessidadeRepository {
  async findById(id) {
    const findNecessidade = await Necessidade.findByPk(id);
    return findNecessidade || null;
  }

  async create(data) {
    const { nome, tipo_voluntariado, descricao, endereco, entidade_id } = data;

    const createNecessidade = await Necessidade.create({
      nome,
      tipo_voluntariado,
      descricao,
      endereco,
      status: true,
      entidade_id,
    });

    return createNecessidade;
  }

  async getAll() {
    const findNecessidade = await Necessidade.findAll();

    return findNecessidade;
  }

  async delete(id) {
    const deleteNecessidade = await Necessidade.destroy({
      where: {
        id,
      },
    });

    if (deleteNecessidade) {
      return { message: 'Necessidade deletada com sucesso' };
    } else {
      return { message: 'Necessidade não encontrada' };
    }
  }
}

export default new NecessidadeRepository();
