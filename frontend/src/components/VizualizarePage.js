import React, { useState, useEffect } from 'react';

const VizualizarePage = () => {
    const [evenimenteTrecute, setEvenimenteTrecute] = useState([]);
    const [evenimenteViitoare, setEvenimenteViitoare] = useState([]);
    const [viewType, setViewType] = useState(null); // 'trecute' sau 'viitoare'
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const organizerId = 1; // Înlocuiește cu ID-ul real al organizatorului

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true); // Indică încărcarea datelor
                const response = await fetch(`http://localhost:5000/events/${organizerId}`);
                
                if (!response.ok) {
                    throw new Error('Eroare la încărcarea evenimentelor');
                }

                const data = await response.json();
                setEvenimenteTrecute(data.trecute);
                setEvenimenteViitoare(data.viitoare);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); // Încărcarea s-a terminat
            }
        };

        fetchEvents();
    }, [organizerId]);

    const handleShowPastEvents = () => setViewType('trecute');
    const handleShowFutureEvents = () => setViewType('viitoare');

    if (loading) {
        return <p>Se încarcă evenimentele...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1>Vizualizare Evenimente</h1>
            <div className="button-group">
                <button onClick={handleShowPastEvents}>Evenimente Trecute</button>
                <button onClick={handleShowFutureEvents}>Evenimente Viitoare</button>
            </div>
            <div id="events-display">
                {viewType === 'trecute' && evenimenteTrecute.length > 0 ? (
                    <ul>
                        {evenimenteTrecute.map((event) => (
                            <li key={event.id}>
                                {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'trecute' ? (
                    <p>Nu există evenimente trecute.</p>
                ) : null}

                {viewType === 'viitoare' && evenimenteViitoare.length > 0 ? (
                    <ul>
                        {evenimenteViitoare.map((event) => (
                            <li key={event.id}>
                                {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'viitoare' ? (
                    <p>Nu există evenimente viitoare.</p>
                ) : null}

                {viewType === null && <p>Selectați o opțiune pentru a vedea evenimentele.</p>}
            </div>
        </div>
    );
};

export default VizualizarePage;
