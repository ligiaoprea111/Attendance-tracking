import React, { useState } from 'react';

const VizualizarePage = () => {
    const [events, setEvents] = useState([]);

    const handleShowPastEvents = () => {
        setEvents(['Eveniment trecut 1', 'Eveniment trecut 2']);
    };

    const handleShowFutureEvents = () => {
        setEvents(['Eveniment viitor 1', 'Eveniment viitor 2']);
    };

    return (
        <div className="container">
            <h1>Vizualizare Evenimente</h1>
            <div className="button-group">
                <button onClick={handleShowPastEvents}>Evenimente Trecute</button>
                <button onClick={handleShowFutureEvents}>Evenimente Viitoare</button>
            </div>
            <div id="events-display">
                {events.length > 0 ? (
                    <ul>
                        {events.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Selectați o opțiune pentru a vedea evenimentele.</p>
                )}
            </div>
        </div>
    );
};

export default VizualizarePage;