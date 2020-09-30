import { Model, Sequelize } from 'sequelize';

class Voluntario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Voluntario;
