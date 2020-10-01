import Sequelize from 'sequelize';
import Voluntario from '../app/models/Voluntario';
import Entidade from '../app/models/Entidade';
import databaseConfig from '../config/database';

const models = [Voluntario, Entidade];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
