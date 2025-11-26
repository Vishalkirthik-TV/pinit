import React from 'react';
import { motion } from 'framer-motion';
import pinitIcon from '../assets/pinit-icon.svg';

const FloatingPins = () => {
    // Create a grid of pins to ensure even distribution
    // 3 columns x 4 rows = 12 zones
    const pins = Array.from({ length: 12 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;

        // Base position within the grid cell
        const baseX = (col * 33) + 10; // 10% padding
        const baseY = (row * 25) + 10; // 10% padding

        return {
            id: i,
            // Add some randomness to the start position within the cell
            x: baseX + (Math.random() * 10 - 5),
            y: baseY + (Math.random() * 10 - 5),
            scale: 0.4 + Math.random() * 0.4,
            duration: 15 + Math.random() * 10,
            delay: Math.random() * 5,
            rotate: Math.random() * 360,
        };
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: -1
        }}>
            {pins.map((pin) => (
                <motion.img
                    key={pin.id}
                    src={pinitIcon}
                    alt=""
                    initial={{
                        x: `${pin.x}vw`,
                        y: `${pin.y}vh`,
                        opacity: 0,
                        scale: 0,
                        rotate: pin.rotate
                    }}
                    animate={{
                        // Move right and then back left, while bobbing up and down
                        x: [`${pin.x}vw`, `${pin.x + 15}vw`, `${pin.x}vw`],
                        y: [`${pin.y}vh`, `${pin.y - 10}vh`, `${pin.y}vh`],
                        rotate: [pin.rotate, pin.rotate + 90, pin.rotate],
                        opacity: [0, 0.3, 0], // Higher opacity for visibility
                        scale: [pin.scale, pin.scale * 1.2, pin.scale]
                    }}
                    transition={{
                        duration: pin.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: pin.delay
                    }}
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: '50px',
                        opacity: 0.3
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingPins;
