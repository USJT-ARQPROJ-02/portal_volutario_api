import { Model, Sequelize } from 'sequelize';

class ResetToken extends Model {
  static init(sequelize) {
    super.init(
      {
        token: Sequelize.STRING,
        user_id: Sequelize.STRING,
        is_used: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    return this;
  }
}

export default ResetToken;
