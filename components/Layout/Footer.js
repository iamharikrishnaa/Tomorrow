import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
 
    return (
        <footer className="footer-area">
            <hr />
            <div className="container">
                @Novagito 2024 all rights reserved
            </div>
        </footer>
    );
}

export default Footer;