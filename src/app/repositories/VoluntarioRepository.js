import Voluntario from '../models/Voluntario';

class VoluntarioRepository {
  async findByEmail(email) {
    const findVoluntario = await Voluntario.findOne({ where: { email } });
    return findVoluntario || null;
  }

  async findById(id) {
    const findVoluntario = await Voluntario.findByPk(id);
    return findVoluntario || null;
  }

  async create(data) {
    const { nome, cpf_cnpj, email, telefone, endereco } = data;
    const createVoluntario = await Voluntario.create({
      nome,
      cpf_cnpj,
      email,
      telefone,
      endereco,
    });
    await createVoluntario.save();
    return createVoluntario;
  }

  async getAll() {
    const findVoluntarios = await Voluntario.findAll();

    return findVoluntarios;
  }

  async delete(id) {
    const deleteVoluntario = await Voluntario.destroy({
      where: {
        id,
      },
    });

    if (deleteVoluntario) {
      return { message: 'Usuario Deletado com sucesso' };
    } else {
      return { message: 'Usuario não encontrado' };
    }
  }
}

export default new VoluntarioRepository();
