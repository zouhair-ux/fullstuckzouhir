import React from 'react';
import { motion } from 'framer-motion';

const VideoSection: React.FC = () => {
    return (
        <section id="tradition" style={{
            position: 'relative',
            height: 'clamp(500px, 85vh, 900px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--secondary)'
        }}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                }}
            >
                <source src="/prestige-video.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Premium Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(18, 42, 22, 0.7) 0%, rgba(18, 42, 22, 0.1) 50%, rgba(18, 42, 22, 0.7) 100%), linear-gradient(to bottom, transparent 60%, rgba(18, 42, 22, 0.6))',
                zIndex: 2
            }} />

            {/* Content Container */}
            <div className="container" style={{ position: 'relative', zIndex: 3, textAlign: 'center', color: 'white' }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 1, letterSpacing: '0.3em' }}
                        transition={{ duration: 1.5 }}
                        style={{
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            fontSize: '1rem',
                            display: 'block',
                            marginBottom: '1.5rem',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        Pureté & Tradition Marocaine
                    </motion.span>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 8vw, 4.5rem)',
                        marginBottom: 'clamp(1rem, 4vw, 2.5rem)',
                        lineHeight: 1.1,
                        textShadow: '0 4px 30px rgba(0,0,0,0.6)'
                    }}>
                        Miel, Huile <br /> & <span style={{ color: 'var(--primary)' }}>Amlou Prestige</span>
                    </h2>

                    <p style={{
                        maxWidth: '750px',
                        margin: '0 auto',
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
                        opacity: 0.9,
                        lineHeight: 1.6,
                        fontWeight: 300,
                        fontStyle: 'italic',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        "Une symphonie de saveurs authentiques, puisée au cœur des terroirs les plus nobles du Maroc pour une expérience gastronomique d'exception."
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        style={{ marginTop: 'clamp(2rem, 8vw, 4.5rem)', display: 'flex', gap: 'clamp(0.5rem, 2vw, 1.5rem)', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        {['100% Naturel', 'Plat de Luxe', 'Qualité Premium'].map((tag, idx) => (
                            <div key={idx} style={{
                                padding: '0.8rem 2rem',
                                border: '1px solid var(--primary)',
                                borderRadius: 'var(--radius-full)',
                                background: 'rgba(212, 175, 55, 0.1)',
                                backdropFilter: 'blur(15px)',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'var(--primary)',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                            }}>
                                {tag}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative bottom fade */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '150px',
                background: 'linear-gradient(to top, var(--bg-light), transparent)',
                zIndex: 2
            }} />
        </section>
    );
};

export default VideoSection;
