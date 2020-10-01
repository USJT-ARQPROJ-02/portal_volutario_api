import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class Entidade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.STRING,
        telefone: Sequelize.STRING,
        tipo_voluntariado: Sequelize.ARRAY(DataTypes.STRING),
      },
      { sequelize }
    );

    this.addHook('beforeSave', async entidade => {
      if (entidade.senha) {
        entidade.senha = await bcrypt.hash(entidade.senha, 8);
      }
    });

    return this;
  }

  async checkPassword(senha) {
    return bcrypt.compare(senha, this.senha);
  }
}

export default Entidade;
