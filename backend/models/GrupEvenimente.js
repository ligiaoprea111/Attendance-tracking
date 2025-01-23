import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconnection.js';

const GrupEvenimente = sequelize.define('grup_evenimente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nume: { type: DataTypes.STRING(255), allowNull: false },
    organizator_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'grup_evenimente',
    timestamps: false,
});

export default GrupEvenimente;
