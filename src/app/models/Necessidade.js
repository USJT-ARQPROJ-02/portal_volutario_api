import { Model, Sequelize } from 'sequelize';

class Necessidade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo_voluntariado: Sequelize.STRING,
        descricao: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        endereco: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entidade, { foreignKey: 'entidade_id' });
  }
}

export default Necessidade;
