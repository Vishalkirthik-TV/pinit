import React from 'react';

const FloatingPins = () => {
    const pins = [
        { top: '10%', left: '5%', delay: '0s', scale: 0.8 },
        { top: '20%', right: '10%', delay: '2s', scale: 1.1 },
        { bottom: '15%', left: '15%', delay: '1s', scale: 0.9 },
        { bottom: '25%', right: '5%', delay: '3s', scale: 1.2 },
        { top: '50%', left: '80%', delay: '4s', scale: 0.7 },
    ];

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
            {pins.map((pin, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: pin.top,
                        left: pin.left,
                        right: pin.right,
                        bottom: pin.bottom,
                        fontSize: '2rem',
                        opacity: 0.2,
                        transform: `scale(${pin.scale})`,
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: pin.delay,
                        color: '#8b5cf6'
                    }}
                >
                    📌
                </div>
            ))}
            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
        </div>
    );
};

export default FloatingPins;
