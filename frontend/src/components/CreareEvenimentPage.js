import React, { useState, useEffect } from 'react';

const CreareEvenimentPage = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [newGroupName, setNewGroupName] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:5000/groups');
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error('Eroare la încărcarea grupurilor:', error);
            }
        };

        fetchGroups();
    }, []);

    const handleCreateGroup = async () => {
        if (!newGroupName) {
            alert('Introduceți un nume pentru grup!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nume: newGroupName, organizator_id: 1 }), // Înlocuiește `1` cu ID-ul organizatorului conectat
            });

            const data = await response.json();
            alert(data.message);
            setGroups([...groups, data.grup]);
            setNewGroupName('');
        } catch (error) {
            console.error('Eroare la crearea grupului:', error);
        }
    };

    const handleCreateEvent = async () => {
        if (!eventName || !eventDate || !eventTime) {
            alert('Toate câmpurile sunt obligatorii!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    grup_id: selectedGroup || null,
                    nume: eventName,
                    cod: `EVT-${Date.now()}`,
                    stare: 'INCHIS',
                    data_eveniment: eventDate,
                    ora: eventTime,
                    organizator_id: 1, // Înlocuiește `1` cu ID-ul organizatorului conectat
                }),
            });

            const data = await response.json();
            alert(data.message);
            setEventName('');
            setEventDate('');
            setEventTime('');
        } catch (error) {
            console.error('Eroare la crearea evenimentului:', error);
        }
    };

    return (
        <div className="container">
            <h1>Creare Eveniment Nou</h1>

            {/* Creare Grup Nou */}
            <div className="form-group">
                <label htmlFor="new-group-name">Creați un grup nou</label>
                <input
                    type="text"
                    id="new-group-name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Introduceți numele grupului"
                />
                <button type="button" onClick={handleCreateGroup}>
                    Creează Grup
                </button>
            </div>

            {/* Selectare Grup Existente */}
            <div className="form-group">
                <label htmlFor="group-select">Selectați Grup</label>
                <select
                    id="group-select"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                >
                    <option value="">Fără grup</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.nume}
                        </option>
                    ))}
                </select>
            </div>

            {/* Detalii Eveniment */}
            <div className="form-group">
                <label htmlFor="event-name">Nume Eveniment</label>
                <input
                    type="text"
                    id="event-name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Introduceți numele evenimentului"
                />
            </div>
            <div className="form-group">
                <label htmlFor="event-date">Data Evenimentului</label>
                <input
                    type="date"
                    id="event-date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="event-time">Ora Evenimentului</label>
                <input
                    type="time"
                    id="event-time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                />
            </div>

            <button type="button" onClick={handleCreateEvent}>
                Creează Eveniment
            </button>
        </div>
    );
};

export default CreareEvenimentPage;
