import { Model, INTEGER, STRING } from 'sequelize'
import Accounts from './Accounts';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false
  },
  accountId: {
    type: INTEGER,
    references: {
      model: 'accounts',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false
});

Users.belongsTo(Accounts, { foreignKey: 'accountId' });

export default Users;