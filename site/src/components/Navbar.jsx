import React from 'react';
import pinitIcon from '../assets/pinit-icon.svg';

const Navbar = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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
      padding: '0.8rem 2rem',
      maxWidth: '1200px',
      width: '95%',
      boxSizing: 'border-box',
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'var(--surface)',
      borderRadius: '100px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src={pinitIcon} alt="Pinit Logo" style={{ height: '36px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Pinit</span>
      </div>
      {/* Desktop Menu */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button onClick={() => scrollToSection('features')} className="nav-link">Features</button>
        <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How it Works</button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            transition: 'transform 0.2s ease'
          }}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        <button className="btn btn-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Get Extension</button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-only">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          marginTop: '1rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          zIndex: 999
        }}>
          <button onClick={() => { scrollToSection('features'); setIsOpen(false); }} className="nav-link" style={{ textAlign: 'center', fontSize: '1.2rem' }}>Features</button>
          <button onClick={() => { scrollToSection('how-it-works'); setIsOpen(false); }} className="nav-link" style={{ textAlign: 'center', fontSize: '1.2rem' }}>How it Works</button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)' }}>Theme:</span>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-main)'
              }}
            >
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Extension</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
