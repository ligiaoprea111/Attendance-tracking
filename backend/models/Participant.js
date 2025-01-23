import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconnection.js';

const Participant = sequelize.define('participant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nume: { type: DataTypes.STRING(255), allowNull: false },
    eveniment_id: { type: DataTypes.INTEGER, allowNull: false },
    ora_inregistrare: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    },
}, {
    tableName: 'participant',
    timestamps: false,
});

export default Participant;
