import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizerSignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
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

        alert('Cont creat cu succes!');
        navigate('/vizualizare');
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
