import { Model, Sequelize } from 'sequelize';

class Entidade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        data_nasc: Sequelize.DATE,
        ativa: Sequelize.BOOLEAN
      },
      { sequelize }
    );
    return this;
  }
}

export default Voluntario;
