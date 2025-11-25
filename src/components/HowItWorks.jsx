import React from 'react';
import DemoAnimation from './DemoAnimation';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: '800', color: '#1a202c' }}>
                See it in <span className="gradient-text">Action</span>
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
                Never lose your place again. Pin important context and jump back to it instantly, even after scrolling through thousands of lines.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
                <DemoAnimation />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>01. Pin</div>
                        <p style={{ color: '#4a5568' }}>Find a key paragraph or code block in your chat or document. Click the Pinit icon to save its location.</p>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f472b6', marginBottom: '0.5rem' }}>02. Scroll</div>
                        <p style={{ color: '#4a5568' }}>Continue your research. Scroll down, generate more content, or switch context without worry.</p>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>03. Recall</div>
                        <p style={{ color: '#4a5568' }}>Need that context back? Click the Pinit extension icon to instantly scroll back to your pinned section.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
