import { Model, Sequelize } from 'sequelize';

class Voluntario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        data_nasc: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}

export default Voluntario;
