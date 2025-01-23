import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ParticipaPage from './components/ParticipaPage';
import OrganizerLoginPage from './components/OrganizerLoginPage';
import OrganizerSignupPage from './components/OrganizerSignupPage';
import VizualizarePage from './components/VizualizarePage';
import CreareEvenimentPage from './components/CreareEvenimentPage';
import VizualizareEvenimentePage from './components/VizualizareEvenimentePage';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ParticipaPage />} />
                <Route path="/login" element={<OrganizerLoginPage />} />
                <Route path="/signup" element={<OrganizerSignupPage />} />
                <Route path="/vizualizare" element={<VizualizarePage />} />
                <Route path="/creare-eveniment" element={<CreareEvenimentPage />} />
                <Route path="/vizualizare" element={<VizualizareEvenimentePage />} />
            </Routes>
        </Router>
    );
}

export default App;
