import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li><Link to="/vizualizare">Vizualizare Evenimente</Link></li>
                <li><Link to="/creare-eveniment">Creare Eveniment Nou</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
