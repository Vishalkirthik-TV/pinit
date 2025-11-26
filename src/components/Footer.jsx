import React from 'react';
import pinitIcon from '../assets/pinit-icon.svg';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', justifyContent: 'inherit' }}>
                        <img src={pinitIcon} alt="Pinit Logo" style={{ height: '32px' }} />
                        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.75rem', color: 'var(--text-main)', fontWeight: '800', margin: 0 }}>Pinit</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '300px' }}>Enhance your research and reading workflow with instant context recall.</p>
                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)', fontWeight: '700' }}>Product</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Features</a>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>How it Works</a>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Pricing</a>
                        </div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)', fontWeight: '700' }}>Company</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>About Us</a>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Blog</a>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Careers</a>
                        </div>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--text-main)', fontWeight: '700' }}>Legal</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Privacy Policy</a>
                            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'Inter', sans-serif" }}>Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>
                © 2024 Pinit. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
