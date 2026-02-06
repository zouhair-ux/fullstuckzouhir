import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, Leaf, Truck } from 'lucide-react';

const TrustBadges: React.FC = () => {
    const badges = [
        {
            icon: <Banknote size={32} />,
            title: "Paiement à la livraison",
            description: "Réglez votre commande en toute sécurité dès réception"
        },
        {
            icon: <Leaf size={32} />,
            title: "Produits 100% naturels",
            description: "Sélectionnés avec soin pour leur pureté et qualité"
        },
        {
            icon: <Truck size={32} />,
            title: "Livraison partout au Maroc",
            description: "Expédition rapide et soignée dans toutes les villes"
        }
    ];

    return (
        <section style={{
            padding: 'clamp(2.5rem, 8vw, 5rem) 1rem',
            background: 'white',
            position: 'relative',
            zIndex: 10
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: 'clamp(1rem, 3vw, 2.5rem)',
                }}>
                    {badges.map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.8 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1rem, 4vw, 2rem)',
                                borderRadius: '24px',
                                background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                                border: '1px solid rgba(212, 175, 55, 0.1)',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                                transition: 'all 0.3s'
                            }}
                            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)' }}
                        >
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '20px',
                                background: 'rgba(212, 175, 55, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary-dark)',
                                marginBottom: '1.5rem',
                            }}>
                                {badge.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: 'var(--secondary)',
                                marginBottom: '0.75rem',
                                fontFamily: 'var(--font-heading)'
                            }}>
                                {badge.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem',
                                lineHeight: 1.6
                            }}>
                                {badge.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
