$navbar = @'
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Leaf, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Produits', path: '/#products' },
        { name: 'À Propos', path: '/about' },
        { name: 'Avis', path: '/reviews' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1500,
                padding: isScrolled ? '0.75rem 0' : '1.5rem 0',
                transition: 'var(--transition)',
                background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
                borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none'
            }}
        >
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    textDecoration: 'none',
                    color: 'var(--secondary)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.5px'
                }}>
                    <Leaf size={28} className="text-primary" />
                    <span className="brand">NATUREL<span style={{ color: 'var(--primary)' }}>PURE</span></span>
                </Link>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2.5rem'
                }} className="desktop-only">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            to={link.path} 
                            style={{ 
                                textDecoration: 'none', 
                                color: isScrolled ? 'var(--text-dark)' : 'black', 
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                opacity: 0.8,
                                transition: 'var(--transition)'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', borderRadius: '10px' }}>
                        Contact
                    </Link>
                    <div style={{ 
                        marginLeft: '0.5rem',
                        cursor: 'pointer',
                        color: 'var(--text-dark)',
                        position: 'relative'
                    }}>
                        <ShoppingCart size={22} />
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-10px',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '0.7rem',
                            padding: '2px 6px',
                            borderRadius: '50%',
                            fontWeight: 'bold'
                        }}>0</span>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
'@

$orderForm = @'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShoppingBag } from 'lucide-react';

interface OrderFormProps {
    productName: string;
    onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ productName, onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        telephone: '',
        ville: '',
        quantite: 1,
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Commande envoyée !');
        onClose();
    };

    return (
        <AnimatePresence>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }} />
                <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="glass-morphism" style={{ position: 'relative', padding: '2.5rem', borderRadius: '30px', maxWidth: '500px', width: '100%', background: 'white' }}>
                    <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                    <h2>Commander {productName}</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <input type="text" name="nom" placeholder="Nom complet" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} value={formData.nom} onChange={handleChange} />
                        <input type="tel" name="telephone" placeholder="Téléphone" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} value={formData.telephone} onChange={handleChange} />
                        <input type="text" name="ville" placeholder="Ville" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} value={formData.ville} onChange={handleChange} />
                        <input type="number" name="quantite" min="1" required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc' }} value={formData.quantite} onChange={handleChange} />
                        <button type="submit" className="btn btn-primary"><Send size={18} /> Confirmer</button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OrderForm;
'@

Set-Content -Path src/components/Navbar.tsx -Value $navbar -Encoding utf8
Set-Content -Path src/components/OrderForm.tsx -Value $orderForm -Encoding utf8
