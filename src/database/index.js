import Sequelize from 'sequelize';
import Voluntario from '../app/models/Voluntario';
import Entidade from '../app/models/Entidade';
import Necessidade from '../app/models/Necessidade';
import Candidatura from '../app/models/Candidatura';
import databaseConfig from '../config/database';

const models = [Voluntario, Entidade, Necessidade, Candidatura];

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
