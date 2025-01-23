import './db/associations.js';
import express from 'express';
import bodyParser from 'body-parser';
import Organizator from './models/Organizator.js';
import sequelize from './db/dbconnection.js';
import cors from 'cors';
import Eveniment from './models/Eveniment.js';
import GrupEvenimente from './models/GrupEvenimente.js';
import Participant from './models/Participant.js';
import { format } from 'fast-csv';



sequelize.authenticate()
    .then(() => console.log('Conexiunea la baza de date a fost realizată cu succes!'))
    .catch(err => console.error('Eroare la conectarea la baza de date:', err));

    
const app = express();
const PORT = 5000;

// Configurare CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitem cereri doar din frontend-ul nostru
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitem metodele HTTP necesare
    credentials: true, // Dacă e nevoie de cookie-uri sau alte credențiale
}));

// Configurare body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint de test
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Endpoint pentru autentificare
app.post('/login', async (req, res) => {
    const { email, parola } = req.body;

    console.log('Email:', email); // Verifică dacă email-ul este primit corect
    console.log('Parola:', parola); // Verifică dacă parola este primită corect

    try {
        const organizator = await Organizator.findOne({ where: { email } });

        if (!organizator) {
            return res.status(404).json({ message: 'Utilizatorul nu există.' });
        }

        if (organizator.parola !== parola) {
            return res.status(401).json({ message: 'Parola este incorectă.' });
        }

        res.json({ message: 'Conectare reușită!', organizator });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare pe server.' });
    }
});

// Endpoint pentru crearea unui cont nou
app.post('/signup', async (req, res) => {
    const { nume, email, parola } = req.body;

    try {
        const existent = await Organizator.findOne({ where: { email } });
        if (existent) {
            return res.status(400).json({ message: 'Email-ul este deja utilizat.' });
        }

        const organizator = await Organizator.create({ nume, email, parola });
        res.status(201).json({ message: 'Cont creat cu succes!', organizator });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare pe server.' });
    }
});

app.get('/events/:organizerId', async (req, res) => {
    const { organizerId } = req.params;

    try {
        const evenimente = await Eveniment.findAll({
            where: { organizator_id: organizerId },
        });

        const dataCurenta = new Date();

        // Separăm evenimentele în trecute și viitoare
        const evenimenteTrecute = evenimente.filter(event => {
            const dataEveniment = new Date(`${event.data_eveniment}T${event.ora}`);
            return dataEveniment < dataCurenta;
        });

        const evenimenteViitoare = evenimente.filter(event => {
            const dataEveniment = new Date(`${event.data_eveniment}T${event.ora}`);
            return dataEveniment >= dataCurenta;
        });

        res.json({
            trecute: evenimenteTrecute,
            viitoare: evenimenteViitoare,
        });
    } catch (error) {
        console.error('Eroare la obținerea evenimentelor:', error);
        res.status(500).json({ message: 'Eroare la obținerea evenimentelor.' });
    }
});

// Creează un eveniment nou
app.post('/events', async (req, res) => {
    const { grup_id, nume, cod, stare, data_eveniment, ora, organizator_id } = req.body;

    if (!organizator_id) {
        return res.status(400).json({ message: 'ID-ul organizatorului este necesar.' });
    }

    console.log('Date primite:', { grup_id, nume, cod, stare, data_eveniment, ora, organizator_id });
    try {
        const evenimentNou = await Eveniment.create({
            grup_id,
            nume,
            cod,
            stare,
            data_eveniment,
            ora,
            organizator_id,
        });
        res.status(201).json({ message: 'Eveniment creat cu succes!', eveniment: evenimentNou });
    } catch (error) {
        console.error('Eroare la crearea evenimentului:', error);
        res.status(500).json({ message: 'Eroare la crearea evenimentului.' });
    }
});

// Obține toate grupurile de evenimente
app.get('/groups', async (req, res) => {
    try {
        const grupuri = await GrupEvenimente.findAll();
        res.json(grupuri);
    } catch (error) {
        console.error('Eroare la obținerea grupurilor:', error);
        res.status(500).json({ message: 'Eroare la obținerea grupurilor.' });
    }
});

// Creează un grup nou de evenimente
app.post('/groups', async (req, res) => {
    const { nume, organizator_id } = req.body;

    try {
        const grupNou = await GrupEvenimente.create({ nume, organizator_id });
        res.status(201).json({ message: 'Grup creat cu succes!', grup: grupNou });
    } catch (error) {
        console.error('Eroare la crearea grupului:', error);
        res.status(500).json({ message: 'Eroare la crearea grupului.' });
    }
});

app.get('/groups/:groupId/events', async (req, res) => {
    const { groupId } = req.params;

    try {
        const evenimente = await Eveniment.findAll({
            where: { grup_id: groupId },
        });

        res.json(evenimente);
    } catch (error) {
        console.error('Eroare la obținerea evenimentelor grupului:', error);
        res.status(500).json({ message: 'Eroare la obținerea evenimentelor grupului.' });
    }
});

app.post('/join-event', async (req, res) => {
    const { codEveniment, numeParticipant } = req.body;

    try {
        const eveniment = await Eveniment.findOne({ where: { cod: codEveniment } });

        if (!eveniment) {
            return res.status(404).json({ message: 'Evenimentul nu există.' });
        }

        const now = new Date();
const oraInregistrare = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
console.log('Ora înregistrare:', oraInregistrare);

        const participantNou = await Participant.create({
            nume: numeParticipant,
            eveniment_id: eveniment.id,
        });

        res.status(200).json({
            message: 'V-ați conectat cu succes la eveniment.',
            eveniment,
            participant: participantNou,
        });
    } catch (error) {
        console.error('Eroare la conectarea la eveniment:', error);
        res.status(500).json({ message: 'Eroare pe server.' });
    }
});

app.get('/events/:eventId/participants', async (req, res) => {
    const { eventId } = req.params;

    try {
        const participanti = await Participant.findAll({ where: { eveniment_id: eventId } });

        if (participanti.length === 0) {
            return res.status(404).json({ message: 'Nu există participanți pentru acest eveniment.' });
        }

        res.status(200).json(participanti);
    } catch (error) {
        console.error('Eroare la obținerea participanților:', error);
        res.status(500).json({ message: 'Eroare la obținerea participanților.' });
    }
});

// Endpoint pentru exportul participanților la un eveniment specific
app.get('/events/:eventId/participants/export', async (req, res) => {
    const { eventId } = req.params;

    try {
        const participanti = await Participant.findAll({ where: { eveniment_id: eventId } });

        if (participanti.length === 0) {
            return res.status(404).json({ message: 'Nu există participanți pentru acest eveniment.' });
        }

        const filePath = `exports/participanti_eveniment_${eventId}.csv`;

        const csvStream = format({ headers: true });
        const writableStream = fs.createWriteStream(filePath);

        csvStream.pipe(writableStream);
        participanti.forEach(participant => {
            csvStream.write({
                ID: participant.id,
                Nume: participant.nume,
                Ora_Inregistrare: participant.ora_inregistrare,
            });
        });

        csvStream.end();
        writableStream.on('finish', () => {
            res.download(filePath, `participanti_eveniment_${eventId}.csv`, err => {
                if (err) {
                    console.error('Eroare la descărcarea fișierului:', err);
                }
                fs.unlinkSync(filePath); // Șterge fișierul după descărcare
            });
        });
    } catch (error) {
        console.error('Eroare la exportul participanților:', error);
        res.status(500).json({ message: 'Eroare la exportul participanților.' });
    }
});

// Endpoint pentru exportul participanților la un grup de evenimente
app.get('/groups/:groupId/participants/export', async (req, res) => {
    const { groupId } = req.params;

    try {
        const evenimente = await Eveniment.findAll({ where: { grup_id: groupId } });
        if (evenimente.length === 0) {
            return res.status(404).json({ message: 'Nu există evenimente pentru acest grup.' });
        }

        const evenimentIds = evenimente.map(event => event.id);
        const participanti = await Participant.findAll({ where: { eveniment_id: evenimentIds } });

        if (participanti.length === 0) {
            return res.status(404).json({ message: 'Nu există participanți pentru acest grup.' });
        }

        const filePath = `exports/participanti_grup_${groupId}.csv`;

        const csvStream = stringify({ headers: true });
        const writableStream = fs.createWriteStream(filePath);

        csvStream.pipe(writableStream);
        participanti.forEach(participant => {
            csvStream.write({
                ID: participant.id,
                Nume: participant.nume,
                Eveniment_ID: participant.eveniment_id,
                Ora_Inregistrare: participant.ora_inregistrare,
            });
        });

        csvStream.end();
        writableStream.on('finish', () => {
            res.download(filePath, `participanti_grup_${groupId}.csv`, err => {
                if (err) {
                    console.error('Eroare la descărcarea fișierului:', err);
                }
                fs.unlinkSync(filePath); // Șterge fișierul după descărcare
            });
        });
    } catch (error) {
        console.error('Eroare la exportul participanților:', error);
        res.status(500).json({ message: 'Eroare la exportul participanților.' });
    }
});


// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
