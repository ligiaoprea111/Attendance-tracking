import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email) {
            alert('Vă rugăm să introduceți un email!');
            return;
        }
        if (!password) {
            alert('Vă rugăm să introduceți parola!');
            return;
        }

        alert('Conectare reușită!');
        navigate('/vizualizare');
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