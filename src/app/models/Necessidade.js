import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

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

    this.addHook('beforeSave', async necessidade => {
      if (necessidade.senha) {
        necessidade.senha = await bcrypt.hash(necessidade.senha, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entidade, { foreignKey: 'entidade_id' });
  }

  async checkPassword(senha) {
    return bcrypt.compare(senha, this.senha);
  }
}

export default Necessidade;
