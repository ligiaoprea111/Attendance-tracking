import React, { useEffect, useState } from 'react';

const VizualizareEvenimentePage = () => {
    const [evenimenteTrecute, setEvenimenteTrecute] = useState([]);
    const [evenimenteViitoare, setEvenimenteViitoare] = useState([]);
    const [participants, setParticipants] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const organizerId = 1; // Înlocuiește cu ID-ul organizatorului conectat

    useEffect(() => {
        const fetchEvenimente = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/events/${organizerId}`);
                const data = await response.json();

                setEvenimenteTrecute(data.trecute);
                setEvenimenteViitoare(data.viitoare);
                console.log('Evenimente Trecute:', evenimenteTrecute);
console.log('Evenimente Viitoare:', evenimenteViitoare);

            } catch (err) {
                setError('Eroare la încărcarea evenimentelor. Încercați din nou.');
                console.error('Eroare:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvenimente();
    }, [organizerId]);

    const fetchParticipants = async (eventId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/events/${eventId}/participants`);
            if (!response.ok) {
                throw new Error('Eroare la încărcarea participanților.');
            }
            const data = await response.json();
            setParticipants((prev) => ({
                ...prev,
                [eventId]: data,
            }));
        } catch (err) {
            setError('Eroare la încărcarea participanților. Încercați din nou.');
            console.error('Eroare:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleParticipantsView = (eventId) => {
        if (selectedEventId === eventId) {
            setSelectedEventId(null); // Ascunde participanții dacă sunt deja afișați
        } else {
            if (!participants[eventId]) {
                fetchParticipants(eventId); // Încarcă participanții doar dacă nu sunt deja încărcați
            }
            setSelectedEventId(eventId);
        }
    };

    if (loading) {
        return <p>Se încarcă...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <h1>Evenimentele mele</h1>

            <h2>Evenimente Trecute</h2>
            {evenimenteTrecute.length > 0 ? (
                <ul>
                    {evenimenteTrecute.map((event) => (
                        <li key={event.id}>
                            <div>
                                <span>
                                    {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                                </span>
                                <button onClick={() => toggleParticipantsView(event.id)}>
                                    {selectedEventId === event.id ? 'Ascunde Participanți' : 'Vezi Participanți'}
                                </button>
                                {selectedEventId === event.id && participants[event.id] && (
                                    <ul>
                                        {participants[event.id].length > 0 ? (
                                            participants[event.id].map((participant) => (
                                                <li key={participant.id}>
                                                    {participant.nume} -{' '}
                                                    {new Date(participant.ora_inregistrare).toLocaleString()}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Nu există participanți pentru acest eveniment.</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu există evenimente trecute.</p>
            )}

            <h2>Evenimente Viitoare</h2>
            {evenimenteViitoare.length > 0 ? (
                <ul>
                    {evenimenteViitoare.map((event) => (
                        <li key={event.id}>
                            <div>
                                <span>
                                    {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                                </span>
                                <button onClick={() => toggleParticipantsView(event.id)}>
                                    {selectedEventId === event.id ? 'Ascunde Participanți' : 'Vezi Participanți'}
                                </button>
                                {selectedEventId === event.id && participants[event.id] && (
                                    <ul>
                                        {participants[event.id].length > 0 ? (
                                            participants[event.id].map((participant) => (
                                                <li key={participant.id}>
                                                    {participant.nume} -{' '}
                                                    {new Date(participant.ora_inregistrare).toLocaleString()}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Nu există participanți pentru acest eveniment.</li>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu există evenimente viitoare.</p>
            )}
        </div>
    );
};

export default VizualizareEvenimentePage;