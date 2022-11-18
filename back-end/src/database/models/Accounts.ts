import { DECIMAL } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize'
import db from '.';

class Accounts extends Model {
  id!: number;
  balance!: string;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  balance: {
    type: DECIMAL(9, 2),
    defaultValue: 100.00,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'accounts',
  timestamps: false
});

export default Accounts;