import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MeetingRoomPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { eventName, eventCode } = location.state || {}; // Preluăm datele din navigate

    const handleLeave = () => {
        if (window.confirm('Sigur doriți să părăsiți camera?')) {
            navigate('/'); // Redirect către pagina principală
        }
    };

    return (
        <div className="meeting-room">
            <h1>Cameră Eveniment</h1>
            <h2>{eventName || 'Nume Eveniment Necunoscut'}</h2>
            <p>Codul Evenimentului: {eventCode}</p>
            <button onClick={handleLeave}>Părăsește Camera</button>
        </div>
    );
};

export default MeetingRoomPage;
