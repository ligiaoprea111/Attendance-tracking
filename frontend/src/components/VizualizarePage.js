import React, { useState, useEffect } from 'react';

const VizualizarePage = () => {
    const [evenimenteTrecute, setEvenimenteTrecute] = useState([]);
    const [evenimenteViitoare, setEvenimenteViitoare] = useState([]);
    const [grupuriEvenimente, setGrupuriEvenimente] = useState([]);
    const [evenimenteGrup, setEvenimenteGrup] = useState([]);
    const [viewType, setViewType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const organizerId = 1; // Înlocuiește cu ID-ul real al organizatorului

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
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
                setLoading(false);
            }
        };

        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:5000/groups');
                if (!response.ok) {
                    throw new Error('Eroare la încărcarea grupurilor');
                }
                const data = await response.json();
                setGrupuriEvenimente(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchEvents();
        fetchGroups();
    }, [organizerId]);

    const handleCopy = (cod) => {
        navigator.clipboard.writeText(cod)
            .then(() => alert(`Codul ${cod} a fost copiat în clipboard!`))
            .catch(() => alert('Eroare la copierea codului.'));
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Sigur doriți să ștergeți acest eveniment?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Eroare la ștergerea evenimentului.');
            }

            alert('Eveniment șters cu succes!');
            setEvenimenteTrecute((prev) => prev.filter((event) => event.id !== eventId));
            setEvenimenteViitoare((prev) => prev.filter((event) => event.id !== eventId));
            setEvenimenteGrup((prev) => prev.filter((event) => event.id !== eventId));
        } catch (err) {
            console.error('Eroare la ștergerea evenimentului:', err);
            alert('Eroare la ștergerea evenimentului.');
        }
    };

    const handleShowPastEvents = () => setViewType('trecute');
    const handleShowFutureEvents = () => setViewType('viitoare');
    const handleShowGroups = () => setViewType('grupuri');

    const handleShowGroupEvents = async (groupId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/groups/${groupId}/events`);
            if (!response.ok) {
                throw new Error('Eroare la încărcarea evenimentelor grupului');
            }
            const data = await response.json();
            setEvenimenteGrup(data);
            setViewType('evenimenteGrup');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
            <h1>Vizualizare Evenimente</h1>
            <div className="button-group">
                <button onClick={handleShowPastEvents}>Evenimente Trecute</button>
                <button onClick={handleShowFutureEvents}>Evenimente Viitoare</button>
                <button onClick={handleShowGroups}>Grupuri de Evenimente</button>
            </div>
            <div id="events-display">
                {/* Vizualizare Evenimente Trecute */}
                {viewType === 'trecute' && evenimenteTrecute.length > 0 ? (
                    <ul>
                        {evenimenteTrecute.map((event) => (
                            <li key={event.id}>
                                <div>
                                    <strong>{event.nume}</strong> - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                                </div>
                                <div className="event-buttons">
                                    <button onClick={() => handleCopy(event.cod)}>Copiază Cod</button>
                                    <button onClick={() => handleDelete(event.id)}>Șterge</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'trecute' ? (
                    <p>Nu există evenimente trecute.</p>
                ) : null}

                {/* Vizualizare Evenimente Viitoare */}
                {viewType === 'viitoare' && evenimenteViitoare.length > 0 ? (
                    <ul>
                        {evenimenteViitoare.map((event) => (
                            <li key={event.id}>
                                <div>
                                    <strong>{event.nume}</strong> - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                                </div>
                                <div className="event-buttons">
                                    <button onClick={() => handleCopy(event.cod)}>Copiază Cod</button>
                                    <button onClick={() => handleDelete(event.id)}>Șterge</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'viitoare' ? (
                    <p>Nu există evenimente viitoare.</p>
                ) : null}

                {/* Vizualizare Grupuri de Evenimente */}
                {viewType === 'grupuri' && grupuriEvenimente.length > 0 ? (
                    <ul>
                        {grupuriEvenimente.map((group) => (
                            <li key={group.id} onClick={() => handleShowGroupEvents(group.id)}>
                                {group.nume}
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'grupuri' ? (
                    <p>Nu există grupuri de evenimente.</p>
                ) : null}

                {/* Vizualizare Evenimente dintr-un Grup */}
                {viewType === 'evenimenteGrup' && evenimenteGrup.length > 0 ? (
                    <ul>
                        {evenimenteGrup.map((event) => (
                            <li key={event.id}>
                                <div>
                                    <strong>{event.nume}</strong> - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
                                </div>
                                <div className="event-buttons">
                                    <button onClick={() => handleCopy(event.cod)}>Copiază Cod</button>
                                    <button onClick={() => handleDelete(event.id)}>Șterge</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : viewType === 'evenimenteGrup' ? (
                    <p>Nu există evenimente în acest grup.</p>
                ) : null}

                {/* Mesaj implicit */}
                {viewType === null && <p>Selectați o opțiune pentru a vedea informațiile.</p>}
            </div>
        </div>
    );
};

export default VizualizarePage;
