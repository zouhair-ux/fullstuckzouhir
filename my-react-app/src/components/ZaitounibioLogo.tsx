import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

interface ZaitounibioLogoProps {
    height?: number;
    className?: string;
    responsive?: boolean;
    withGlow?: boolean;
    inverted?: boolean;
}

const ZaitounibioLogo: React.FC<ZaitounibioLogoProps> = ({
    height = 70,
    className = '',
    responsive = true,
    inverted = false,
}) => {
    // Elegant scaling - slightly larger for impact
    const displayHeight = height * 1.4;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className={`premium-luxury-logo ${className} ${responsive ? 'responsive' : ''}`}
                style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    overflow: 'visible',
                }}
            >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={logo}
                        alt="ZaitouniBio Luxury Brand"
                        style={{
                            height: responsive ? `calc(${displayHeight}px * var(--logo-scale, 1))` : `${displayHeight}px`,
                            width: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                            // On dark backgrounds (inverted=true), use normal blending and boost brightness
                            // On light backgrounds (inverted=false), multiply helps blend if needed, or use normal
                            mixBlendMode: inverted ? 'normal' : 'multiply',
                            filter: inverted
                                ? `drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)) brightness(1.2) contrast(1.1)`
                                : `drop-shadow(0 2px 10px rgba(0,0,0,0.1)) drop-shadow(0 0 12px rgba(184, 134, 11, 0.25)) contrast(1.1) brightness(1.02) saturate(1.05)`,
                            opacity: inverted ? 1 : 0.95
                        }}
                    />
                </div>

                {/* Precision Responsive Scale Logic */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .premium-luxury-logo.responsive {
                        --logo-scale: 1;
                    }
                    @media (max-width: 1024px) {
                        .premium-luxury-logo.responsive { --logo-scale: 0.85; }
                    }
                    @media (max-width: 768px) {
                        .premium-luxury-logo.responsive { --logo-scale: 0.75; }
                        .premium-luxury-logo { padding: 6px; }
                    }
                `}} />
            </motion.div>
        </AnimatePresence>
    );
};

export default ZaitounibioLogo;
