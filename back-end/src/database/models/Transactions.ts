import { Model, INTEGER, DECIMAL, STRING, DATE, literal } from 'sequelize'
import Accounts from './Accounts';
import db from '.';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  value: {
    type: DECIMAL(9, 2),
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    defaultValue: literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize: db,
  tableName: 'transactions',
  timestamps: false
});

Transactions.belongsToMany(Accounts, {
  as: 'debited',
  through: Transactions,
  foreignKey: 'debitedAccountId',
  otherKey: 'creditedAccountId'
});

Transactions.belongsToMany(Accounts, {
  as: 'credited',
  through: Transactions,
  foreignKey: 'creditedAccountId',
  otherKey: 'debitedAccountId'
});

export default Transactions;