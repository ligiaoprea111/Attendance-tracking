import React, { useState } from 'react';

const CreareEvenimentPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventCode, setEventCode] = useState('');

    const handleCreateEvent = () => {
        if (!eventName || !eventDate || !eventCode) {
            alert('Vă rugăm să completați toate câmpurile!');
            return;
        }

        alert(`Eveniment creat: ${eventName} - ${eventDate} - ${eventCode}`);
    };

    return (
        <div className="container">
            <h1>Creare Eveniment Nou</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="event-name">Nume Eveniment</label>
                    <input
                        type="text"
                        id="event-name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Introduceți numele evenimentului"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="event-date">Data Evenimentului</label>
                    <input
                        type="date"
                        id="event-date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="event-code">Cod Eveniment</label>
                    <input
                        type="text"
                        id="event-code"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                        placeholder="Introduceți un cod unic pentru eveniment"
                        required
                    />
                </div>
                <button type="button" onClick={handleCreateEvent}>Creează Eveniment</button>
            </form>
        </div>
    );
};

export default CreareEvenimentPage;
