import Voluntario from '../models/Voluntario';

class VoluntarioRepository {
  constructor() {
    this.voluntario = Voluntario;
  }

  async findByEmail(email) {
    const findVoluntario = await this.voluntario.findOne({ where: { email } });
    return findVoluntario || null;
  }

  async create(data) {
    const { nome, cpf_cnpj, email, telefone, data_nasc } = data;
    const createVoluntario = await this.voluntario.create({
      nome,
      cpf_cnpj,
      email,
      telefone,
      data_nasc,
    });
    await createVoluntario.save();
    return createVoluntario;
  }
}

export default new VoluntarioRepository();
