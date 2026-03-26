import React, { useState, useEffect } from 'react';
import pinitIcon from '../assets/pinit-icon.svg';

const DemoAnimation = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                setStep(0); // Reading content
                await new Promise(r => setTimeout(r, 1500));
                setStep(1); // Floating pin icon appears, cursor moves to it
                await new Promise(r => setTimeout(r, 700));
                setStep(2); // Click floating pin icon (press)
                await new Promise(r => setTimeout(r, 200));
                setStep(3); // Release - content is now pinned
                await new Promise(r => setTimeout(r, 1200));
                setStep(4); // User scrolls down - cursor moves to reading position
                await new Promise(r => setTimeout(r, 2500));
                setStep(5); // Move cursor to extension icon to recall
                await new Promise(r => setTimeout(r, 700));
                setStep(6); // Click extension icon (press)
                await new Promise(r => setTimeout(r, 200));
                setStep(7); // Release - scroll back to pinned content
                await new Promise(r => setTimeout(r, 2000));
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
            border: '1px solid var(--border)',
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
                    style={{
                        transition: 'all 0.2s',
                        transform: (step === 6) ? 'scale(1.3)' : (step === 7 ? 'scale(1.2)' : 'scale(1)'),
                        position: 'relative',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src={pinitIcon}
                        alt="Pinit"
                        style={{
                            height: '24px',
                            width: '24px',
                            filter: (step === 6 || step === 7) ? 'none' : 'grayscale(100%) opacity(0.5)'
                        }}
                    />
                </div>
            </div>

            {/* Content Container */}
            <div style={{
                padding: '24px',
                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: (step >= 4 && step < 7) ? 'translateY(-300px)' : 'translateY(0)',
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
                <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0 }}></div>
                    <div
                        style={{
                            background: step >= 3 ? '#fff8f0' : '#f1f5f9',
                            border: step >= 3 ? '1px solid var(--primary)' : '1px solid transparent',
                            padding: '16px',
                            borderRadius: '0 12px 12px 12px',
                            width: '90%',
                            position: 'relative',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ color: step >= 3 ? '#d35400' : '#475569', fontSize: '0.95rem', lineHeight: '1.5', fontWeight: step >= 3 ? '500' : '400' }}>
                            "The key finding is that user retention correlates directly with interaction speed."
                        </div>

                        {/* Pinned Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            opacity: step >= 3 ? 1 : 0,
                            transform: step >= 3 ? 'scale(1)' : 'scale(0)',
                            transition: 'all 0.3s',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                        }}>
                            Pinned!
                        </div>
                    </div>

                    {/* Floating Pin Icon - appears on the right side of the message */}
                    <div style={{
                        position: 'absolute',
                        right: '-5px',
                        top: '50%',
                        width: '32px',
                        height: '32px',
                        background: 'var(--primary)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(255, 154, 118, 0.4)',
                        opacity: (step >= 1 && step <= 3) ? 1 : 0,
                        transform: (step >= 1 && step <= 3) ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0)',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: 15,
                        cursor: 'pointer'
                    }}>
                        <img
                            src={pinitIcon}
                            alt="Pin"
                            style={{
                                height: '18px',
                                width: '18px',
                                filter: 'brightness(0) invert(1)', // Make it white
                                transform: step === 2 ? 'scale(0.8)' : 'scale(1)',
                                transition: 'transform 0.1s'
                            }}
                        />
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
                transition: (step === 2 || step === 6) ? 'all 0.1s ease-out' : 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: `translate(${step === 0 ? '150px, 180px' : // Reading position (near target content)
                    step === 1 ? '570px, 195px' : // Move to Floating Pin Icon (right side of message)
                        step === 2 ? '572px, 197px' : // Click down - slight offset for press effect
                            step === 3 ? '570px, 195px' : // Release
                                step === 4 ? '200px, 350px' : // Reading position while scrolled down
                                    step === 5 ? '540px, 22px' : // Move to Extension Icon (top right)
                                        step === 6 ? '542px, 24px' : // Click down
                                            '540px, 22px' // Release
                    })`,
                zIndex: 30
            }}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                        transform: (step === 2 || step === 6) ? 'scale(0.9)' : 'scale(1)',
                        transition: 'transform 0.1s'
                    }}
                >
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
                fontWeight: '500',
                transition: 'opacity 0.3s'
            }}>
                {step === 0 && "Reading important content..."}
                {step === 1 && "Click to pin this message"}
                {(step === 2 || step === 3) && "Section pinned!"}
                {step === 4 && "Scrolling down..."}
                {step === 5 && "Click extension to recall"}
                {(step === 6 || step === 7) && "Jumping back to pinned section"}
            </div>
        </div>
    );
};

export default DemoAnimation;
