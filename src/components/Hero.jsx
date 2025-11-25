import React from 'react';
import ProductShowcase from './ProductShowcase';
import FloatingPins from './FloatingPins';

const Hero = () => {
    return (
        <section className="container" style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            <FloatingPins />
            <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                Focus on what matters. <br />
                <span className="gradient-text">Pin the rest.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '650px', marginBottom: '3rem', lineHeight: '1.8' }}>
                The essential tool for researchers, students, and professionals. Instantly pin key sections in long documents and AI chats to stay organized and efficient.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
                <button style={{ background: '#8b5cf6', color: 'white', padding: '14px 32px', borderRadius: '30px', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>Add to Chrome - It's Free</button>
                <button style={{ background: 'white', color: '#4a5568', padding: '14px 32px', borderRadius: '30px', fontSize: '1.1rem', border: '1px solid #e2e8f0' }}>Watch Demo</button>
            </div>
            <div style={{ width: '100%', maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
                <ProductShowcase />
            </div>
        </section>
    );
};

export default Hero;
