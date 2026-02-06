import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Hammer, Wind, ClipboardCheck, Play } from 'lucide-react';

const OilProcess: React.FC = () => {
    const phases = [
        {
            icon: <Leaf className="text-primary" size={32} />,
            title: "Récolte Artisanale",
            desc: "Les olives sont cueillies à la main à maturité parfaite pour préserver leur intégrité.",
            color: "rgba(102, 126, 61, 0.1)"
        },
        {
            icon: <Wind className="text-primary" size={32} />,
            title: "Nettoyage & Tri",
            desc: "Lavage à l'eau pure et élimination des feuilles pour ne garder que le meilleur du fruit.",
            color: "rgba(184, 134, 11, 0.1)"
        },
        {
            icon: <Hammer className="text-primary" size={32} />,
            title: "Broyage Traditionnel",
            desc: "Moulure à froid par meules de pierre, libérant les arômes sans chauffer la pâte.",
            color: "rgba(102, 126, 61, 0.1)"
        },
        {
            icon: <Droplets className="text-primary" size={32} />,
            title: "Extraction à Froid",
            desc: "Séparation naturelle de l'huile vierge, conservant tous les nutriments essentiels.",
            color: "rgba(184, 134, 11, 0.1)"
        },
        {
            icon: <ClipboardCheck className="text-primary" size={32} />,
            title: "Repos & Pureté",
            desc: "Décantation naturelle avant mise en bouteille, garantissant une clarté optimale.",
            color: "rgba(102, 126, 61, 0.1)"
        }
    ];

    return (
        <section style={{ padding: '10rem 0', background: 'white', position: 'relative' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            color: 'var(--primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontWeight: 700,
                            fontSize: '0.9rem'
                        }}
                    >
                        Notre Savoir-Faire
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            color: 'var(--secondary)',
                            marginTop: '1rem',
                            fontFamily: 'var(--font-heading)'
                        }}
                    >
                        L'Huile d'Attaouia : Un Héritage
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        style={{
                            height: '4px',
                            background: 'var(--primary)',
                            margin: '2rem auto',
                            borderRadius: '2px'
                        }}
                    />
                </div>

                {/* Desktop Timeline */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '8rem'
                }}>
                    {phases.map((phase, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            style={{
                                padding: '2.5rem 1.5rem',
                                borderRadius: '24px',
                                background: phase.color,
                                border: '1px solid rgba(0,0,0,0.03)',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '18px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.05)'
                            }}>
                                {phase.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                color: 'var(--secondary)',
                                marginBottom: '1rem',
                                fontWeight: 700
                            }}>
                                {phase.title}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)',
                                lineHeight: 1.6
                            }}>
                                {phase.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Video Section Modernized */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        position: 'relative',
                        borderRadius: 'clamp(20px, 4vw, 40px)',
                        overflow: 'hidden',
                        height: 'clamp(300px, 60vh, 700px)',
                        boxShadow: '0 40px 100px -20px rgba(18, 42, 22, 0.4)',
                        background: '#000',
                    }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <video
                        controls
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'relative',
                            zIndex: 1,
                            // Slightly less filtered so it looks clear
                            filter: 'contrast(1.05)'
                        }}
                    >
                        <source src="/notre-histoire.mp4" type="video/mp4" />
                        Votre navigateur ne supporte pas la vidéo.
                    </video>

                    {/* Gradient Overlay removed as requested, keeping just a subtle one if needed or none. User said "sans ecriture... et tous ca". Pure video. */}
                </motion.div>

                {/* Decorative floating badge */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        right: '10%',
                        zIndex: 15,
                        background: 'var(--primary)',
                        color: 'var(--secondary)',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Leaf size={18} />
                    ORIGINE ATTAOUIA
                </motion.div>
            </div>

            {/* Background elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '-5%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                opacity: 0.03,
                borderRadius: '50%',
                filter: 'blur(80px)',
                zIndex: 0
            }} />
        </section>
    );
};

export default OilProcess;
