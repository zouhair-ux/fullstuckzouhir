import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount, deliveryFee, totalWithDelivery } = useCart();

    const handleDiscover = () => {
        onClose();
        navigate('/catalog');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.4)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2000
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: 'clamp(300px, 90vw, 450px)',
                            background: 'white',
                            zIndex: 2001,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <ShoppingBag size={24} color="var(--primary)" />
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary)' }}>Mon Panier</h2>
                                <span style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                                    {cartCount}
                                </span>
                            </div>
                            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                                <X size={28} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cartItems.length === 0 ? (
                                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1.5rem', color: '#64748b' }}>
                                    <ShoppingBag size={64} opacity={0.2} />
                                    <p style={{ fontSize: '1.1rem' }}>Votre panier est vide pour le moment.</p>
                                    <button onClick={handleDiscover} className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Découvrir nos produits</button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', gap: '1.2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <div style={{ width: '90px', height: '90px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.2rem', lineHeight: 1.2 }}>
                                                        {item.name}
                                                    </h3>
                                                    {item.name_ar && (
                                                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Amiri', color: '#94a3b8', margin: '0 0 0.4rem 0', direction: 'rtl' }}>
                                                            {item.name_ar}
                                                        </h4>
                                                    )}
                                                    <div style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>{item.price} DH</div>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id, item.weight)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '0.3rem' }}>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.weight)} style={{ background: 'transparent', border: 'none', padding: '0.3rem', cursor: 'pointer' }}><Minus size={14} /></button>
                                                    <span style={{ padding: '0 0.8rem', minWidth: '40px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.weight)} style={{ background: 'transparent', border: 'none', padding: '0.3rem', cursor: 'pointer' }}><Plus size={14} /></button>
                                                </div>
                                                {item.weight && (
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 700, background: 'var(--primary-light)', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>
                                                        {item.weight}
                                                    </div>
                                                )}
                                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                                    Total: {(typeof item.price === 'number' ? item.price : parseFloat(String(item.price))) * item.quantity} DH
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div style={{ padding: '2rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>Sous-total</span>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)' }}>{cartTotal} DH</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>Livraison</span>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{deliveryFee} DH</span>
                                    </div>
                                    <div style={{ height: '1px', background: '#e2e8f0', margin: '0.5rem 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1rem', color: 'var(--secondary)', fontWeight: 800 }}>Total</span>
                                        <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--secondary)' }}>{totalWithDelivery} DH</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', fontSize: '1.1rem', gap: '1rem', boxShadow: '0 10px 20px -5px rgba(212, 175, 55, 0.4)' }}
                                >
                                    <CreditCard size={22} />
                                    Finaliser la commande
                                    <ArrowRight size={22} style={{ marginLeft: 'auto' }} />
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                                    Paiement sécurisé à la livraison partout au Maroc.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
