import React from 'react';
import ProductShowcase from './ProductShowcase';
const Hero = () => {
    return (
        <section className="container hero-section">
            <h1 className="hero-title">
                Focus on what matters. <br />
                <span className="text-gradient">Pin the rest.</span>
            </h1>
            <p className="hero-subtitle">
                The essential tool for researchers, students, and professionals. Instantly pin key sections in long documents and AI chats to stay organized and efficient.
            </p>
            <div className="hero-buttons">
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
