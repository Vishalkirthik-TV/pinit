import React from 'react';
import pinitIcon from '../assets/pinit-icon.svg';

const ProductShowcase = () => {
    return (
        <div className="glass-card product-showcase">
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
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>chatgpt.com/c/research-paper-analysis</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src={pinitIcon} alt="Pinit" style={{ height: '16px' }} /> <span className="desktop-only">Pinit</span>
                    </span>
                </div>
            </div>

            {/* Chat Interface Mockup */}
            <div className="chat-interface">

                {/* User Message */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="chat-bubble">
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
                        <div className="pinned-highlight">
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
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <img src={pinitIcon} alt="Pin" style={{ height: '12px', filter: 'brightness(0) invert(1)' }} /> Pinned
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
