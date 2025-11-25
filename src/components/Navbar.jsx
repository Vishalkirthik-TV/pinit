import React from 'react';
import logo from '../assets/logo-pastel.png';

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
      background: 'rgba(253, 251, 247, 0.8)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={logo} alt="Pinit Logo" style={{ height: '48px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c' }}>Pinit</span>
      </div>
      <div>
        <button onClick={() => scrollToSection('features')} style={{ background: 'transparent', border: 'none', color: '#4a5568', marginRight: '20px', fontWeight: '500', boxShadow: 'none' }}>Features</button>
        <button onClick={() => scrollToSection('how-it-works')} style={{ background: 'transparent', border: 'none', color: '#4a5568', marginRight: '20px', fontWeight: '500', boxShadow: 'none' }}>How it Works</button>
        <button style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '20px', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)' }}>Get Extension</button>
      </div>
    </nav>
  );
};

export default Navbar;
