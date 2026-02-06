import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Zap, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import api, { getImageUrl } from '../api/axios';
import { useCart } from '../context/CartContext';

interface ProductDetailsProps {
    onOrder: (product: any, weight?: string, quantity?: number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onOrder }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'fr' | 'ar'>('fr');
    const [quantity, setQuantity] = useState(1);
    const [isImageOpen, setIsImageOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name_fr,
                name_ar: product.name_ar, // Pass Arabic Name
                price: product.price,
                image: product.image,
                weight: product.weight
            }, product.weight, quantity);
        }
    };

    const handleBuyNow = () => {
        if (product) {
            onOrder(product, product.weight, quantity);
        }
    };

    if (loading) return (
        <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="loader">Chargement...</div>
        </div>
    );

    if (!product) return (
        <div style={{ height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <h2>Produit introuvable</h2>
            <button onClick={() => navigate('/')} className="btn-primary">Retour à l'accueil</button>
        </div>
    );

    const priceNum = parseFloat(product.price.replace(/[^\d.]/g, ''));

    return (
        <div style={{ background: '#fcfcfc', minHeight: '100vh', paddingTop: '80px', fontFamily: 'var(--font-body)' }}>

            <div className="container" style={{ padding: '0.8rem 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
                    <ChevronRight size={12} />
                    <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>{product.name_fr}</span>
                </div>
            </div>

            <div className="container" style={{ padding: '0 0 4rem 0' }}>
                <div className="product-details-grid">

                    {/* Left Column: Image Showcase */}
                    <div className="product-image-wrapper">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(-1)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: 'transparent', border: 'none', cursor: 'pointer',
                                marginBottom: '1.5rem', color: 'var(--text-muted)', fontWeight: 600
                            }}
                        >
                            <ArrowLeft size={20} /> Retour
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="product-image-container"
                        >
                            <div style={{
                                position: 'absolute', top: '1.5rem', right: '1.5rem',
                                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                                padding: '0.5rem 1rem', borderRadius: '30px',
                                fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-dark)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}>
                                {product.category_name}
                            </div>
                            <img
                                src={getImageUrl(product.image)}
                                alt={product.name_fr}
                                onClick={() => setIsImageOpen(true)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                            />
                        </motion.div>
                    </div>

                    {/* Right Column: Product Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="product-info-container"
                    >
                        {/* Header & Language Switch */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <h1 className="product-title-main">
                                {activeTab === 'fr' ? product.name_fr : product.name_ar}
                            </h1>

                            {/* Modern Language Pill */}
                            <div style={{
                                background: '#f1f5f9', padding: '4px', borderRadius: '30px',
                                display: 'flex', gap: '4px'
                            }}>
                                <button
                                    onClick={() => setActiveTab('fr')}
                                    style={{
                                        padding: '6px 16px', borderRadius: '24px', border: 'none',
                                        background: activeTab === 'fr' ? 'white' : 'transparent',
                                        color: activeTab === 'fr' ? 'var(--secondary)' : '#94a3b8',
                                        fontWeight: 700, cursor: 'pointer',
                                        boxShadow: activeTab === 'fr' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >FR</button>
                                <button
                                    onClick={() => setActiveTab('ar')}
                                    style={{
                                        padding: '6px 16px', borderRadius: '24px', border: 'none',
                                        background: activeTab === 'ar' ? 'white' : 'transparent',
                                        color: activeTab === 'ar' ? 'var(--secondary)' : '#94a3b8',
                                        fontWeight: 700, cursor: 'pointer',
                                        fontFamily: 'Amiri', fontSize: '1.1rem', lineHeight: 1,
                                        boxShadow: activeTab === 'ar' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >عربي</button>
                            </div>
                        </div>

                        {/* Price & Rating */}
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                                {product.is_promo && product.discount_price ? (
                                    <>
                                        <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: '#94a3b8', fontWeight: 600 }}>
                                            {priceNum} DH
                                        </span>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ef4444' }}>
                                            {parseFloat(product.discount_price)}
                                        </span>
                                        <span style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444' }}>DH</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-dark)' }}>
                                            {priceNum}
                                        </span>
                                        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>DH</span>
                                    </>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', background: '#fffbeb', padding: '0.4rem 0.8rem', borderRadius: '12px' }}>
                                <Star size={16} fill="#f59e0b" />
                                <span style={{ fontWeight: 700, color: '#b45309', fontSize: '0.9rem' }}>Top Terroir</span>
                            </div>
                        </div>

                        {/* Description Body */}
                        <div style={{ marginBottom: '3rem' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{
                                        fontSize: '0.95rem', // Reduced from 1.1rem
                                        lineHeight: 1.7,
                                        color: '#475569',
                                        direction: activeTab === 'ar' ? 'rtl' : 'ltr',
                                        fontFamily: activeTab === 'ar' ? "'Cairo', sans-serif" : 'inherit'
                                    }}
                                >
                                    <p style={{ marginBottom: '2rem' }}>
                                        {activeTab === 'fr' ? product.description_fr : product.description_ar}
                                    </p>

                                    {(activeTab === 'fr' ? product.benefits_fr : product.benefits_ar) && (
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.15) 100%)',
                                            padding: '1.5rem', // Slightly reduced padding
                                            borderRadius: '20px',
                                            border: '1px solid rgba(212, 175, 55, 0.2)'
                                        }}>
                                            <h4 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
                                                {activeTab === 'fr' ? 'Les Bienfaits' : 'الفوائد'}
                                            </h4>
                                            <ul style={{ margin: 0, paddingLeft: '1.5rem', listStyle: 'none' }}>
                                                {(activeTab === 'fr' ? product.benefits_fr : product.benefits_ar).split('\n').map((line: string, idx: number) => (
                                                    line.trim() && (
                                                        <li key={idx} style={{ position: 'relative', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                                            <span style={{ position: 'absolute', left: '-1.5rem', color: 'var(--primary)' }}>•</span>
                                                            {line}
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Complete Action Bar */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            alignItems: 'center',
                            marginTop: '2rem',
                            padding: '1rem',
                            background: 'white',
                            borderRadius: '24px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            border: '1px solid #f1f5f9'
                        }}>
                            {/* Quantity */}
                            <div style={{
                                background: '#f8fafc', borderRadius: '14px', padding: '0.4rem', display: 'flex', gap: '0.8rem', alignItems: 'center', border: '1px solid #e2e8f0'
                            }}>
                                <button onClick={() => quantity > 1 && setQuantity(q => q - 1)} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Minus size={14} /></button>
                                <span style={{ fontWeight: 800, fontSize: '1rem', minWidth: '15px' }}>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Plus size={14} /></button>
                            </div>

                            <div className="action-buttons-container" style={{ display: 'flex', gap: '0.8rem', flex: 1, flexWrap: 'wrap' }}>
                                <button onClick={handleAddToCart} style={{
                                    flex: '1 1 120px', padding: '1rem', borderRadius: '16px', border: '2px solid #e2e8f0', background: 'white',
                                    color: 'var(--secondary)', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    <ShoppingCart size={20} />
                                    PANIER
                                </button>

                                <button onClick={handleBuyNow} style={{
                                    flex: '2 1 160px', padding: '1rem', borderRadius: '16px', border: 'none', background: 'var(--secondary)',
                                    color: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                                    fontSize: '0.95rem',
                                    minWidth: 'fit-content' // Prevent crushing
                                }}>
                                    <Zap size={18} fill="white" />
                                    COMMANDER
                                </button>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
            {/* Lightbox Overlay */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsImageOpen(false)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={getImageUrl(product.image)}
                            alt={product.name_fr}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                            style={{
                                maxHeight: '90vh', maxWidth: '100%',
                                objectFit: 'contain', borderRadius: '12px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}
                        />
                        <button
                            onClick={() => setIsImageOpen(false)}
                            style={{
                                position: 'absolute', top: '2rem', right: '2rem',
                                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', cursor: 'pointer', transition: 'background 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetails;
