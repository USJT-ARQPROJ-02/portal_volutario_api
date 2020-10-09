import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class Candidatura extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.STRING,
        aprovado: Sequelize.BOOLEAN,
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
