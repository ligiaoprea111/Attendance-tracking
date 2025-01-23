import Organizator from '../models/Organizator.js';
import Eveniment from '../models/Eveniment.js';
import GrupEvenimente from '../models/GrupEvenimente.js';
import Participant from '../models/Participant.js';

// Relație între organizator și grupuri de evenimente
Organizator.hasMany(GrupEvenimente, { foreignKey: 'organizator_id' });
GrupEvenimente.belongsTo(Organizator, { foreignKey: 'organizator_id' });

// Relație între grupuri de evenimente și evenimente
GrupEvenimente.hasMany(Eveniment, { foreignKey: 'grup_id' });
Eveniment.belongsTo(GrupEvenimente, { foreignKey: 'grup_id' });

// Relație între evenimente și participanți
Eveniment.hasMany(Participant, { foreignKey: 'eveniment_id' });
Participant.belongsTo(Eveniment, { foreignKey: 'eveniment_id' });
