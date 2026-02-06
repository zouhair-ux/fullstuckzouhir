import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Award, ShieldCheck, Heart, Users, Calendar, MapPin } from 'lucide-react';
import OilProcess from './OilProcess';
import heroBg from '../assets/hero-bg.jpg';

import ZaitounibioLogo from './ZaitounibioLogo';

const About: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 300); // Small delay to ensure render is complete
            }
        }
    }, [hash]);

    const values = [
        {
            icon: <Award className="text-primary" size={32} />,
            title: "Excellence",
            desc: "Une sélection rigoureuse des meilleurs terroirs pour une qualité sans compromis."
        },
        {
            icon: <ShieldCheck className="text-primary" size={32} />,
            title: "Pureté",
            desc: "Produits 100% naturels, sans additifs, préservant toutes leurs vertus originelles."
        },
        {
            icon: <Heart className="text-primary" size={32} />,
            title: "Passion",
            desc: "Un amour profond pour notre terre et un respect total du savoir-faire artisanal."
        }
    ];

    const stats = [
        { label: "Années d'Expérience", value: "15+" },
        { label: "Producteurs Partenaires", value: "50+" },
        { label: "Clients Satisfaits", value: "10k+" },
        { label: "Produits Naturels", value: "100%" }
    ];

    return (
        <div style={{ background: 'var(--bg-light)', overflow: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                height: '80vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(rgba(18, 42, 22, 0.7), rgba(18, 42, 22, 0.5)), url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                textAlign: 'center',
                color: 'white',
                padding: '0 1rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ maxWidth: '900px', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <ZaitounibioLogo height={120} inverted={true} withGlow={true} />
                    </motion.div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        L'Âme de notre Terroir
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        maxWidth: '700px',
                        margin: '0 auto',
                        opacity: 0.9,
                        lineHeight: 1.6
                    }}>
                        Depuis plus de 15 ans, nous parcourons les terroirs les plus reculés du Maroc pour vous offrir l'essence même de la nature.
                    </p>
                </motion.div>

                {/* Scroll indicator overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: 0,
                    width: '100%',
                    height: '150px',
                    background: 'linear-gradient(transparent, var(--bg-light))',
                    pointerEvents: 'none'
                }} />
            </section>

            {/* Values Section */}
            <section style={{ padding: '8rem 0', position: 'relative' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 className="section-title">Nos Valeurs Fondamentales</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem'
                    }}>
                        {values.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="glass-morphism"
                                style={{
                                    padding: '3.5rem 2.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    textAlign: 'center',
                                    background: 'white',
                                    border: '1px solid rgba(0,0,0,0.03)'
                                }}
                            >
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '20px',
                                    background: 'var(--primary-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 2rem auto',
                                    opacity: 0.8
                                }}>
                                    {val.icon}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '1rem' }}>{val.title}</h3>
                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section - Alternating */}
            <section id="notre-histoire" style={{ padding: '4rem 0' }}>
                <div className="container">
                    {/* Item 1 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '6rem',
                        alignItems: 'center',
                        marginBottom: '10rem'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.5rem' }}>
                                <MapPin size={20} />
                                <span>Origine & Terroir</span>
                            </div>
                            <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '2rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                                Une Quête de <br />Perfection
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Notre voyage commence dans les montagnes de l'Atlas et les plaines ensoleillées du Souss. Nous travaillons main dans la main avec des coopératives locales qui partagent notre vision d'une agriculture durable et respectueuse de la biodiversité.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Miel d\'Euphorbe du Haut Atlas', 'Huile d\'Olive Aataoui de Kelaa Sraghna', 'Argan d\'Essaouira'].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem', color: 'var(--secondary)', fontWeight: 500 }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100%',
                                height: '100%',
                                border: '2px solid var(--primary-light)',
                                borderRadius: 'var(--radius-lg)',
                                zIndex: 0
                            }} />
                            <img
                                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1000&auto=format&fit=crop"
                                alt="Notre Terroir"
                                style={{ width: '100%', borderRadius: 'var(--radius-lg)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }}
                            />
                        </motion.div>
                    </div>

                    {/* Item 2 - Inverted */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '6rem',
                        alignItems: 'center',
                        direction: 'rtl'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ direction: 'ltr' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary-dark)', fontWeight: 600, marginBottom: '1.5rem' }}>
                                <Calendar size={20} />
                                <span>Tradition & Savoir-faire</span>
                            </div>
                            <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '2rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>
                                L'Incomparable <br />Art du Bio
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Chaque goutte d'huile et chaque gramme de miel que nous proposons est traité avec le plus grand soin. De la récolte manuelle à la filtration douce, nous veillons à ce que le produit fini soit identique à ce que la nature nous a offert.
                            </p>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <div className="glass-morphism" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', flex: 1, background: 'rgba(212, 175, 55, 0.05)' }}>
                                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Extraction</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pressage à froid traditionnel</p>
                                </div>
                                <div className="glass-morphism" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', flex: 1, background: 'rgba(212, 175, 55, 0.05)' }}>
                                    <h4 style={{ color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Contrôle</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Analyses laboratoires rigoureuses</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative' }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000&auto=format&fit=crop"
                                alt="Savoir-faire"
                                style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Oil Process Section - NEW */}
            <OilProcess />

            {/* Stats Section */}
            <section style={{
                padding: '8rem 0',
                background: 'var(--secondary)',
                color: 'white',
                marginTop: '8rem'
            }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '3rem',
                        textAlign: 'center'
                    }}>
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <h2 style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.value}</h2>
                                <p style={{ fontSize: '1.1rem', opacity: 0.8, letterSpacing: '1px', textTransform: 'uppercase' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Call to Action Section */}
            <section style={{ padding: '10rem 0', textAlign: 'center' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '800px', margin: '0 auto' }}
                    >
                        <Users size={60} className="text-primary" style={{ marginBottom: '2rem' }} />
                        <h2 style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                            Rejoignez l'Aventure Zaitounibio
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                            Nos produits sont bien plus que de la nourriture. Ils sont le reflet d'une culture, d'un terroir et d'un engagement pour une vie plus saine.
                        </p>
                        <Link to="/catalog" className="btn btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                            Découvrir nos produits
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
