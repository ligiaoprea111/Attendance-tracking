import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerSignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!name) {
            alert('Vă rugăm să introduceți numele!');
            return;
        }
        if (!email) {
            alert('Vă rugăm să introduceți un email!');
            return;
        }
        if (!password) {
            alert('Vă rugăm să introduceți parola!');
            return;
        }

        try {
            // Trimite cererea POST către backend
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nume: name, // Trimite numele
                    email,      // Trimite email-ul
                    parola: password, // Trimite parola
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Cont creat cu succes!');
                console.log(data); // Afișează răspunsul în consolă (opțional)
                navigate('/login'); // Navighează către pagina de login
            } else {
                alert(data.message); // Afișează mesajul de eroare din backend
            }
        } catch (error) {
            console.error('Eroare la conectarea la server:', error);
            alert('Eroare la conectarea la server. Vă rugăm să încercați din nou.');
        }
    };

    return (
        <div className="container">
            <h1>Creare Cont Organizator</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="organizer-name">Nume</label>
                    <input
                        type="text"
                        id="organizer-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Introduceți numele"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="organizer-email">Email</label>
                    <input
                        type="email"
                        id="organizer-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduceți email-ul"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="organizer-password">Parolă</label>
                    <input
                        type="password"
                        id="organizer-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduceți parola"
                        required
                    />
                </div>
                <button type="button" onClick={handleSignup}>Creare Cont</button>
            </form>
        </div>
    );
};

export default OrganizerSignupPage;
