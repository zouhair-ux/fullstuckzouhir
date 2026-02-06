import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const reviews = [
    {
        name: "Yasmine El Fassi",
        rating: 5,
        comment: "Le miel d'euphorbe est d'une pureté rare. On sent immédiatement la différence avec les produits industriels. C'est devenu mon remède matinal indispensable.",
        product: "Miel d'Euphorbe",
        date: "Janvier 2026",
        initials: "YF"
    },
    {
        name: "Omar Benjelloun",
        rating: 5,
        comment: "L'Amlou est tout simplement sublime. On sent les amandes torréfiées à point et le goût du miel pur qui vient adoucir le tout. Une vraie madeleine de Proust.",
        product: "Amlou Traditionnel",
        date: "Décembre 2025",
        initials: "OB"
    },
    {
        name: "Sarah Mansouri",
        rating: 5,
        comment: "L'huile d'argan cosmétique a transformé ma routine. Elle est légère, pénètre vite et son parfum de noisette grillée est très discret. Qualité irréprochable.",
        product: "Huile d'Argan",
        date: "il y a 3 jours",
        initials: "SM"
    },
    {
        name: "Driss Tazi",
        rating: 4,
        comment: "Excellents produits et service client très réactif. Le miel de thym est puissant, idéal pour les maux de gorge. Je commanderai à nouveau sans hésiter.",
        product: "Miel de Thym",
        date: "il y a 1 semaine",
        initials: "DT"
    },
    {
        name: "Meryem Alaoui",
        rating: 5,
        comment: "J'ai offert le coffret Prestige à ma mère, elle a été enchantée. L'emballage est soigné et les produits sont présentés avec beaucoup d'élégance.",
        product: "Pack Prestige",
        date: "il y a 2 semaines",
        initials: "MA"
    },
    {
        name: "Karim Idrissi",
        rating: 5,
        comment: "Le miel d'oranger est parfait pour les enfants, très doux et parfumé. Merci Zaitounibio pour ce travail de préservation du terroir marocain.",
        product: "Miel d'Oranger",
        date: "Janvier 2026",
        initials: "KI"
    }
];

const Reviews: React.FC = () => {
    return (
        <div style={{ paddingTop: '10rem', background: '#fcfcfc', minHeight: '100vh' }}>
            <div className="container" style={{ paddingBottom: '8rem' }}>

                {/* Header Section */}
                <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 8rem auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            color: 'var(--primary-dark)',
                            fontWeight: 800,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            display: 'block',
                            marginBottom: '1.5rem'
                        }}>
                            Témoignages & Expériences
                        </span>
                        <h1 className="section-title" style={{ marginBottom: '2rem' }}>La Voix de nos Amis</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.3rem', lineHeight: 1.6, fontWeight: 400 }}>
                            Chaque retour est une source d'inspiration. Découvrez comment <br />
                            <strong>Zaitounibio</strong> s'invite dans le quotidien de ceux qui privilégient l'excellence.
                        </p>
                    </motion.div>
                </div>

                {/* Reviews Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'white',
                                padding: '3rem',
                                borderRadius: '32px',
                                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.04)',
                                border: '1px solid rgba(0,0,0,0.02)',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative'
                            }}
                        >
                            <div style={{ position: 'absolute', top: '2.5rem', right: '3rem', color: 'rgba(212, 175, 55, 0.08)' }}>
                                <Quote size={50} />
                            </div>

                            {/* Header: Avatar + Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, var(--secondary), #1a3d20)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 800,
                                    fontSize: '1.2rem',
                                    boxShadow: '0 10px 20px rgba(18, 42, 22, 0.15)'
                                }}>
                                    {review.initials}
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--secondary)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {review.name}
                                        <CheckCircle2 size={16} color="var(--primary)" />
                                    </h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Acheteur Vérifié</span>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill={i < review.rating ? 'var(--primary)' : 'none'}
                                        color={i < review.rating ? 'var(--primary)' : '#e2e8f0'}
                                        strokeWidth={1}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p style={{
                                fontSize: '1.15rem',
                                color: 'var(--secondary)',
                                lineHeight: 1.7,
                                marginBottom: '2.5rem',
                                fontStyle: 'normal',
                                fontWeight: 400
                            }}>
                                "{review.comment}"
                            </p>

                            {/* Footer: Product + Date */}
                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '2rem',
                                borderTop: '1px solid #f8fafc',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--primary-dark)',
                                    fontWeight: 700,
                                    background: 'var(--primary-light)',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '10px'
                                }}>
                                    {review.product}
                                </div>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final CTA Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        marginTop: '10rem',
                        background: `linear-gradient(rgba(18, 42, 22, 0.9), rgba(18, 42, 22, 0.9)), url(${heroBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '40px',
                        padding: '6rem 4rem',
                        textAlign: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 30px 60px rgba(18, 42, 22, 0.2)'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Communauté</span>
                        <h2 style={{ fontSize: '3rem', margin: '1.5rem 0', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Votre avis compte pour nous</h2>
                        <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 3.5rem auto', lineHeight: 1.6 }}>
                            Vous avez goûté à nos produits ? Partagez votre expérience avec la communauté Zaitounibio et contribuez à faire rayonner le terroir d'exception.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                            style={{
                                background: 'var(--primary)',
                                color: 'var(--secondary)',
                                padding: '1.2rem 3rem',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                borderRadius: '16px'
                            }}
                        >
                            Rédiger un Témoignage
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Reviews;
