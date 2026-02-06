import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MessageSquare, CheckCircle2, Building2 } from 'lucide-react';
import api from '../api/axios';

interface OrderFormProps {
    productName: string;
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ productName, onClose }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        telephone: '',
        city: 'Casablanca',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders/', {
                customer_name: formData.full_name,
                phone: formData.telephone,
                city: formData.city,
                address: formData.message ? 'Note: ' + formData.message : 'Pas d\'adresse spécifiée',
                items_description: productName,
                status: 'PENDING'
            });
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const cities = [
        "Casablanca", "Rabat", "Marrakech", "Agadir", "Tanger", "Fès", "Meknès", "Oujda", "Kénitra",
        "Tétouan", "Salé", "Nador", "Safi", "Béni Mellal", "El Jadida", "Mohammédia", "Taza", "Khemisset", "Autre"
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="order-form-overlay"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="order-form-container"
                style={{
                    maxWidth: '95vw',
                    width: '420px',
                    margin: '0 auto',
                    maxHeight: '90vh',
                    overflowY: 'auto'
                }}
            >
                {!isSubmitted && (
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: '1rem', right: '1rem', background: 'transparent',
                            border: 'none', cursor: 'pointer', color: '#94a3b8'
                        }}
                    >
                        <X size={20} />
                    </button>
                )}

                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.4rem', color: 'var(--secondary)', marginBottom: '0.3rem' }}>Commander Directement</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Produit : <span style={{ color: 'var(--primary-dark)', fontWeight: 700 }}>{productName}</span></p>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 10 }}>
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nom Complet"
                                        className="order-form-input"
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 10 }}>
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Téléphone (06...)"
                                        className="order-form-input"
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 10 }}>
                                        <Building2 size={18} />
                                    </div>
                                    <select
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="order-form-input"
                                        style={{ appearance: 'none' }}
                                    >
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '1rem', top: '1rem', color: '#94a3b8', zIndex: 10 }}>
                                        <MessageSquare size={18} />
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Note ou Remarques (Optionnel)"
                                        className="order-form-input"
                                        style={{ minHeight: '80px', paddingTop: '0.8rem', resize: 'none' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        width: '100%', padding: '1rem', borderRadius: '12px', border: 'none',
                                        background: 'var(--secondary)', color: 'white', fontWeight: 800,
                                        fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 10px 20px -5px rgba(18, 42, 22, 0.2)',
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    {loading ? 'Traitement...' : 'CONFIRMER LA COMMANDE'}
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                                    Paiement à la livraison. Livraison: <span style={{ color: 'var(--primary-dark)', fontWeight: 700 }}>45 DH</span> (Inclus)
                                </p>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ textAlign: 'center', padding: '1rem' }}
                        >
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.1)',
                                color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto'
                            }}>
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Merci !</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                Commande reçue. <br />
                                Nous vous appellerons pour confirmer.
                            </p>
                            <button
                                onClick={onClose}
                                style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'transparent', cursor: 'pointer' }}
                            >
                                Fermer
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default OrderForm;