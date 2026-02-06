import React from 'react';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
    return (
        <div style={{ paddingTop: '120px', minHeight: '80vh', background: '#fcfcfc' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                        Les Bienfaits de la Nature
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '4rem' }}>
                        Découvrez nos articles sur les vertus thérapeutiques du miel pur, de l'huile d'olive extra vierge et de nos produits du terroir.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        {/* Placeholder Post 1 */}
                        <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                            <div style={{ height: '200px', background: '#e2e8f0' }}></div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Nutrition</span>
                                <h3 style={{ fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>Les vertus du miel d'Amelou</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Découvrez pourquoi le miel d'Amelou est considéré comme un super-aliment...</p>
                                <button style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--primary-dark)', fontWeight: 700, cursor: 'pointer' }}>Lire la suite →</button>
                            </div>
                        </div>

                        {/* Placeholder Post 2 */}
                        <div style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
                            <div style={{ height: '200px', background: '#e2e8f0' }}></div>
                            <div style={{ padding: '2rem' }}>
                                <span style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Bien-être</span>
                                <h3 style={{ fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>L'huile d'olive en cosmétique</h3>
                                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Comment utiliser l'huile d'olive extra vierge pour vos soins de peau naturels...</p>
                                <button style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--primary-dark)', fontWeight: 700, cursor: 'pointer' }}>Lire la suite →</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
