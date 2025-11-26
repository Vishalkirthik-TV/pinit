import React from 'react';
import pinitIcon from '../assets/pinit-icon-clear.png';

const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      padding: '1rem 2rem',
      maxWidth: '1200px',
      width: '95%',
      boxSizing: 'border-box',
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'var(--surface)', // Solid background
      borderRadius: '100px', // Pill shape
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)', // Stronger shadow
      transition: 'all 0.3s ease',
      border: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={pinitIcon} alt="Pinit Logo" style={{ height: '40px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pinit</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
        <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How it Works</button>
        <button className="btn btn-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Get Extension</button>
      </div>
    </nav>
  );
};

export default Navbar;
