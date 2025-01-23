import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconnection.js';

const Organizator = sequelize.define('organizator', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nume: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), unique: true, allowNull: false },
    parola: { type: DataTypes.STRING(255), allowNull: false },
}, {
    tableName: 'organizator',
    timestamps: false,
});

export default Organizator;
