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
    const { nome, cpf_cnpj, email, telefone, data_nasc } = data;
    const createEntidade = await Entidade.create({
      nome,
      cpf_cnpj,
      email,
      telefone,
      data_nasc,
    });
    await createEntidade.save();
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
      return { message: 'Usuario Deletado com sucesso' };
    } else {
      return { message: 'Usuario não encontrado' };
    }
  }
}

export default new EntidadeRepository();
