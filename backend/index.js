import './db/associations.js';
import express from 'express';
import bodyParser from 'body-parser';
import Organizator from './models/Organizator.js';
import sequelize from './db/dbconnection.js';
import cors from 'cors';
import Eveniment from './models/Eveniment.js';

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

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
