import React, { useState, useEffect } from 'react';

const DemoAnimation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                setStep(0); // Reading
                await new Promise(r => setTimeout(r, 1500));
                setStep(1); // Hover Pin
                await new Promise(r => setTimeout(r, 500));
                setStep(2); // Click Pin
                await new Promise(r => setTimeout(r, 1500));
                setStep(3); // Scroll Away
                await new Promise(r => setTimeout(r, 2000));
                setStep(4); // Click Extension
                await new Promise(r => setTimeout(r, 3000));
            }
        };
        sequence();
    }, []);

    return (
        <div className="glass-card" style={{
            padding: '0',
            overflow: 'hidden',
            textAlign: 'left',
            maxWidth: '600px',
            width: '100%',
            margin: '0 auto',
            height: '450px',
            position: 'relative',
            background: '#fff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
            {/* Browser Bar */}
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, position: 'relative' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></div>
                </div>

                {/* Pinit Extension Icon */}
                <div
                    id="demo-extension-icon"
                    style={{
                        color: step === 4 ? '#8b5cf6' : '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: step === 4 ? 'scale(1.2)' : 'scale(1)',
                        fontSize: '1.2rem'
                    }}
                >
                    📌
                </div>
            </div>

            {/* Content Container */}
            <div style={{
                padding: '24px',
                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: step === 3 ? 'translateY(-300px)' : step === 4 ? 'translateY(0)' : 'translateY(0)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* Chat Bubbles */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }}></div>
                    <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '0 12px 12px 12px', width: '80%', color: '#64748b', fontSize: '0.9rem' }}>
                        Here is the analysis of the data you requested...
                    </div>
                </div>

                {/* Target Section to Pin */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }}></div>
                    <div
                        id="demo-target-section"
                        style={{
                            background: step >= 2 ? '#fdf2f8' : '#f1f5f9',
                            border: step >= 2 ? '1px solid #f472b6' : '1px solid transparent',
                            padding: '16px',
                            borderRadius: '0 12px 12px 12px',
                            width: '90%',
                            position: 'relative',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ color: step >= 2 ? '#be185d' : '#475569', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: step >= 2 ? '500' : '400' }}>
                            "The key finding is that user retention correlates directly with interaction speed."
                        </div>

                        {/* Pin Button (Hover state) */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            background: '#db2777',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            opacity: step >= 2 ? 1 : 0,
                            transform: step >= 2 ? 'scale(1)' : 'scale(0)',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                            Pinned!
                        </div>
                    </div>
                </div>

                {/* More Content (Simulating long scroll) */}
                {[1, 2, 3, 4].map(i => (
                    <div key={`more-${i}`} style={{ display: 'flex', gap: '12px', opacity: 0.5 }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }}></div>
                        <div style={{ background: '#f8fafc', height: '40px', width: i % 2 === 0 ? '85%' : '60%', borderRadius: '0 12px 12px 12px' }}></div>
                    </div>
                ))}
            </div>

            {/* Cursor Simulation */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '24px',
                height: '24px',
                pointerEvents: 'none',
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: `translate(${step === 0 ? '50px, 300px' :
                        step === 1 ? '70%, 180px' : // Hover Pin
                            step === 2 ? '70%, 180px' : // Click Pin
                                step === 3 ? '40%, 400px' : // Scrolling down
                                    '92%, 25px' // Clicking Extension (Approximate top-right)
                    })`,
                zIndex: 20
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" fill="black" stroke="white" strokeWidth="1" />
                </svg>
            </div>

            {/* Status Label */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                color: '#1e293b',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                fontWeight: '500'
            }}>
                {step === 0 && "Reading..."}
                {step === 1 && "Spotting key info"}
                {step === 2 && "Pinning section"}
                {step === 3 && "Scrolling away..."}
                {step === 4 && "Instant recall!"}
            </div>
        </div>
    );
};

export default DemoAnimation;
