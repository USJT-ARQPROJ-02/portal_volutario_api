import Sequelize, { DataTypes, Model } from 'sequelize';

class Necessidade extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo_voluntariado: Sequelize.STRING,
        descricao: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        endereco: Sequelize.STRING,
        cep: Sequelize.STRING,
        longitude: Sequelize.STRING,
        latitude: Sequelize.STRING,
        data_inicio: Sequelize.DATE,
        data_fim: Sequelize.DATE,
        feedback: { type: Sequelize.STRING, allowNull: true },
        images: {
          allowNull: true,
          type: Sequelize.ARRAY(DataTypes.STRING),
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entidade, { foreignKey: 'entidade_id' });
    this.hasMany(models.Candidatura, { foreignKey: 'necessidade_id' });
  }
}

export default Necessidade;
