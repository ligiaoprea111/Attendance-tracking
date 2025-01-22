import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipaPage = () => {
    const navigate = useNavigate();
    const [eventCode, setEventCode] = useState('');
    const [participantName, setParticipantName] = useState('');

    const handleParticipa = () => {
        if (!eventCode) {
            alert('Vă rugăm să introduceți codul întâlnirii!');
            return;
        }
        if (!participantName) {
            alert('Vă rugăm să introduceți numele dumneavoastră!');
            return;
        }

        alert('Participare reușită!');
        navigate('/login');
    };

    return (
        <div className="container">
            <h1>Participă la Eveniment</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="event-code">Codul întâlnirii</label>
                    <input
                        type="text"
                        id="event-code"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                        placeholder="Introduceți codul întâlnirii"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="participant-name">Nume participant</label>
                    <input
                        type="text"
                        id="participant-name"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        placeholder="Introduceți numele dumneavoastră"
                        required
                    />
                </div>
                <button type="button" onClick={handleParticipa}>Participă</button>
            </form>
            <button onClick={() => navigate('/login')}>Conectare Organizator</button>
        </div>
    );
};

export default ParticipaPage;
