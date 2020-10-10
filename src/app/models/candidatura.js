import { Model, Sequelize } from 'sequelize';

class Candidatura extends Model {
  static init(sequelize) {
    super.init(
      {
        status: { type: Sequelize.BOOLEAN, allowNull: true },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Necessidade, { foreignKey: 'necessidade_id' });
    this.belongsTo(models.Voluntario, { foreignKey: 'voluntario_id' });
  }
}

export default Candidatura;
