import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import heroBg from '../assets/hero-bg.jpg';

const Hero: React.FC = () => {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            padding: 'clamp(6rem, 15vh, 10rem) 1rem clamp(3rem, 10vh, 6rem) 1rem',
            overflow: 'hidden',
            background: `linear-gradient(rgba(18, 42, 22, 0.75), rgba(18, 42, 22, 0.6)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '300px',
                height: '300px',
                background: 'var(--primary)',
                filter: 'blur(150px)',
                opacity: 0.2,
                borderRadius: '50%',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ maxWidth: '1000px', zIndex: 1 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.6rem 1.2rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(212, 175, 55, 0.25)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: 'var(--primary-light)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        marginBottom: 'clamp(1rem, 4vw, 2rem)'
                    }}
                >
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                    Premium & 100% Organique
                </motion.div>

                <h1 style={{
                    fontSize: 'clamp(2.2rem, 10vw, 5.5rem)',
                    marginBottom: '1rem',
                    lineHeight: 1,
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.03em',
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    L'Essence de la <br />
                    <span style={{
                        color: 'var(--primary)',
                        fontStyle: 'italic',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        Nature
                        <svg style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                            <path d="M0,10 Q50,0 100,10" fill="none" stroke="var(--primary)" strokeWidth="4" opacity="0.6" />
                        </svg>
                    </span>
                    {" "}Pure
                </h1>

                <p style={{
                    fontSize: 'clamp(1rem, 2.8vw, 1.3rem)',
                    marginBottom: 'clamp(2rem, 8vw, 3.5rem)',
                    color: 'rgba(255,255,255,0.95)',
                    maxWidth: '800px',
                    margin: '0 auto clamp(2rem, 8vw, 3.5rem) auto',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    Découvrez une sélection d'exception de miel pur et d'huile ,
                    récoltés avec respect au cœur des terroirs les plus préservés.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/catalog"
                            className="btn btn-primary"
                            style={{ padding: '1.2rem 2.5rem', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', background: 'var(--primary)', color: 'var(--secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                        >
                            Explorer la boutique
                            <ArrowRight size={22} />
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            to="/about#notre-histoire"
                            className="btn btn-outline"
                            style={{ padding: '1.2rem 2.5rem', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'white', borderColor: 'white', textDecoration: 'none', display: 'inline-block' }}
                        >
                            Notre savoir-faire
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    bottom: '3rem',
                    color: 'white',
                    opacity: 0.6
                }}
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
