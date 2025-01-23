import { DataTypes } from 'sequelize';
import sequelize from '../db/dbconnection.js';

const Eveniment = sequelize.define('eveniment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    grup_id: { type: DataTypes.INTEGER, allowNull: true },
    nume: { type: DataTypes.STRING(255), allowNull: false },
    cod: { type: DataTypes.STRING(255), allowNull: false },
    stare: { 
        type: DataTypes.ENUM('INCHIS', 'DESCHIS'), 
        allowNull: false, 
        defaultValue: 'INCHIS' 
    },
    data_eveniment: { type: DataTypes.DATE, allowNull: true },
    ora: { type: DataTypes.TIME, allowNull: true },
    organizator_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: 'organizator', // Numele tabelului din baza de date
            key: 'id', // Cheia primară din tabelul `organizator`
        },
    },
}, {
    tableName: 'eveniment',
    timestamps: false,
});

export default Eveniment;
