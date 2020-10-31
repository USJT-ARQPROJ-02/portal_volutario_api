import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class Voluntario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf_cnpj: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
        cep: Sequelize.STRING,
        longitude: Sequelize.STRING,
        latitude: Sequelize.STRING,
        tipo_voluntariado: Sequelize.ARRAY(DataTypes.STRING),
        senha: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async voluntario => {
      if (voluntario.senha) {
        voluntario.senha = await bcrypt.hash(voluntario.senha, 8);
      }
    });

    return this;
  }

  async checkPassword(senha) {
    return bcrypt.compare(senha, this.senha);
  }
}

export default Voluntario;
