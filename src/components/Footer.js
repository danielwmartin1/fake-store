import React, { useState } from 'react';
import '../App.css';

export default function Footer() {
    const [year] = useState(new Date().getFullYear());

    return (
        <footer>
            <p>Daniel Martin © {year}</p>
        </footer>
    );
}