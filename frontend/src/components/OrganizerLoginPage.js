import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
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
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, parola: password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Conectare reușită!');
                console.log(data); // Afișează răspunsul în consolă (opțional)
                navigate('/vizualizare'); // Navighează către pagina de evenimente
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
            <h1>Conectare Organizator</h1>
            <form>
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
                <button type="button" onClick={handleLogin}>Conectare</button>
            </form>
            <p className="signup-link">
                Nu aveți cont? <button onClick={() => navigate('/signup')}>Creați unul acum</button>
            </p>
        </div>
    );
};

export default OrganizerLoginPage;
