import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
    <div className="glass-card" style={{ textAlign: 'left', padding: '2rem', background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: 'var(--background)', width: 'fit-content', padding: '10px', borderRadius: '12px' }}>{icon}</div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
    </div>
);

const Features = () => {
    return (
        <section className="container" style={{ padding: '6rem 2rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center', fontWeight: '800', color: 'var(--text-main)' }}>Why professionals choose <span className="text-gradient">Pinit</span></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                <FeatureCard
                    icon="📌"
                    title="Pin Key Insights"
                    description="Highlight and pin crucial paragraphs in research papers, documentation, or chat logs. Never lose track of important information."
                />
                <FeatureCard
                    icon="⚡"
                    title="Instant Navigation"
                    description="Jump between pinned sections with a single click. Navigate long threads and documents with unprecedented speed and ease."
                />
                <FeatureCard
                    icon="🎓"
                    title="Universal Compatibility"
                    description="Seamlessly integrates with ChatGPT, Claude, Google Docs, and any web-based research tool you use daily."
                />
            </div>
        </section>
    );
};

export default Features;
