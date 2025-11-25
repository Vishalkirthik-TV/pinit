import React from 'react';

const Footer = () => {
    return (
        <footer style={{ borderTop: '1px solid #e2e8f0', padding: '4rem 0', marginTop: '6rem', background: '#fff' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1a202c', fontWeight: '700' }}>Pinit</h3>
                    <p style={{ color: '#718096' }}>Enhance your research and reading workflow.</p>
                </div>
                <div style={{ display: 'flex', gap: '2.5rem' }}>
                    <a href="#" style={{ color: '#4a5568' }}>Privacy Policy</a>
                    <a href="#" style={{ color: '#4a5568' }}>Terms of Service</a>
                    <a href="#" style={{ color: '#4a5568' }}>Contact</a>
                </div>
                <div style={{ color: '#a0aec0' }}>
                    © 2024 Pinit. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
