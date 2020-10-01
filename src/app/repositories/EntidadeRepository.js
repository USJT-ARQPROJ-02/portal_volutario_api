import Entidade from '../models/Entidade';

class EntidadeRepository {
  async findByEmail(email) {
    const findEntidade = await Entidade.findOne({ where: { email } });
    return findEntidade || null;
  }

  async findById(id) {
    const findEntidade = await Entidade.findByPk(id);
    return findEntidade || null;
  }

  async create(data) {
    const { nome, cnpj, email, senha, telefone, tipo_voluntariado } = data;
    const createEntidade = await Entidade.create({
      nome,
      cnpj,
      email,
      senha,
      telefone,
      tipo_voluntariado,
    });

    return createEntidade;
  }

  async getAll() {
    const findEntidade = await Entidade.findAll();

    return findEntidade;
  }

  async delete(id) {
    const deleteEntidade = await Entidade.destroy({
      where: {
        id,
      },
    });

    if (deleteEntidade) {
      return { message: 'Entidade deletada com sucesso' };
    } else {
      return { message: 'Entidade não encontrada' };
    }
  }
}

export default new EntidadeRepository();
