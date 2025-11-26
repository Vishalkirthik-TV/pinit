import React from 'react';

const ProductShowcase = () => {
    return (
        <div className="glass-card" style={{
            padding: '0',
            overflow: 'hidden',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '0 auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--border)',
            background: 'var(--surface)'
        }}>
            {/* Browser Header */}
            <div style={{ background: '#f1f5f9', padding: '12px 20px', display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', alignItems: 'center' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></div>
                <div style={{
                    background: 'white',
                    marginLeft: '20px',
                    padding: '6px 16px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    color: '#64748b',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid #e2e8f0'
                }}>
                    <span>chatgpt.com/c/research-paper-analysis</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>📌 Pinit</span>
                </div>
            </div>

            {/* Chat Interface Mockup */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', minHeight: '400px' }}>

                {/* User Message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#f3f4f6', padding: '12px 20px', borderRadius: '16px 16px 0 16px', maxWidth: '80%', color: '#1f2937' }}>
                        Can you summarize the key findings of the 2024 study on attention mechanisms?
                    </div>
                </div>

                {/* AI Response with Pinned Section */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10a37f', flexShrink: 0 }}></div>
                    <div style={{ flex: 1 }}>
                        <div style={{ color: '#374151', lineHeight: '1.6', marginBottom: '16px' }}>
                            Certainly. The 2024 study introduces a novel "Sparse Attention" model that significantly reduces computational overhead.
                        </div>

                        {/* Pinned Highlight */}
                        <div style={{
                            background: '#fff8f0',
                            borderLeft: '4px solid var(--primary)',
                            padding: '16px',
                            borderRadius: '4px',
                            position: 'relative',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                📌 Pinned
                            </div>
                            <p style={{ margin: 0, color: '#d35400', fontWeight: '500' }}>
                                "The proposed architecture achieves 98% accuracy while reducing inference time by 40%, making it suitable for real-time edge applications."
                            </p>
                        </div>

                        <div style={{ color: '#374151', lineHeight: '1.6' }}>
                            This finding suggests a major shift in how we can deploy LLMs on consumer hardware...
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductShowcase;
