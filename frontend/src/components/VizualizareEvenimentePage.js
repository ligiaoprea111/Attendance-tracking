import React, { useEffect, useState } from 'react';

const VizualizareEvenimentePage = () => {
    const [evenimenteTrecute, setEvenimenteTrecute] = useState([]);
    const [evenimenteViitoare, setEvenimenteViitoare] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const organizerId = 1; // Înlocuiește cu ID-ul organizatorului conectat

    useEffect(() => {
        const fetchEvenimente = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/events/${organizerId}`);
                const data = await response.json();

                setEvenimenteTrecute(data.trecute);
                setEvenimenteViitoare(data.viitoare);
            } catch (err) {
                setError('Eroare la încărcarea evenimentelor. Încercați din nou.');
                console.error('Eroare:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvenimente();
    }, [organizerId]);

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
                            {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
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
                            {event.nume} - {new Date(`${event.data_eveniment}T${event.ora}`).toLocaleString()}
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
