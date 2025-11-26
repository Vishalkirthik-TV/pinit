import React from 'react';
import pinitIcon from '../assets/pinit-icon.png';

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--background)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={pinitIcon} alt="Pinit Logo" style={{ height: '40px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Pinit</span>
      </div>
      <div>
        <button onClick={() => scrollToSection('features')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginRight: '20px', fontWeight: '600', boxShadow: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem' }}>Features</button>
        <button onClick={() => scrollToSection('how-it-works')} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginRight: '20px', fontWeight: '600', boxShadow: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem' }}>How it Works</button>
        <button className="btn btn-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Get Extension</button>
      </div>
    </nav>
  );
};

export default Navbar;
