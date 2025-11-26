import React from 'react';
import ProductShowcase from './ProductShowcase';
const Hero = () => {
    return (
        <section className="container" style={{ padding: '6rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                Focus on what matters. <br />
                <span className="text-gradient">Pin the rest.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '3rem', lineHeight: '1.8' }}>
                The essential tool for researchers, students, and professionals. Instantly pin key sections in long documents and AI chats to stay organized and efficient.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
                <button className="btn btn-primary">Add to Chrome - It's Free</button>
                <button className="btn btn-secondary">Watch Demo</button>
            </div>
            <div style={{ width: '100%', maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
                <ProductShowcase />
            </div>
        </section>
    );
};

export default Hero;
