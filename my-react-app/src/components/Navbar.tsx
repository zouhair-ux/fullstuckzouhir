import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import api, { getImageUrl } from '../api/axios';
import ZaitounibioLogo from './ZaitounibioLogo';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const location = useLocation();

    // Search State
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [allProducts, setAllProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch products for search
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products/');
                setAllProducts(response.data);
            } catch (error) {
                console.error("Error fetching products for search", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        // Helper to remove accents for comparison
        const normalizeText = (text: string) =>
            text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const normalizedTerm = normalizeText(searchTerm);
        const lowerTerm = searchTerm.toLowerCase();

        const results = allProducts.filter(product => {
            const nameFr = normalizeText(product.name_fr || '');
            const descFr = normalizeText(product.description_fr || '');
            // Check category name in different possible structures
            const category = normalizeText(product.category_name || product.category?.name_fr || '');

            // Arabic check: simple partial match is often sufficient
            const nameAr = (product.name_ar || '').toLowerCase();
            const descAr = (product.description_ar || '').toLowerCase();

            return (
                nameFr.includes(normalizedTerm) ||
                descFr.includes(normalizedTerm) ||
                category.includes(normalizedTerm) ||
                nameAr.includes(lowerTerm) ||
                descAr.includes(lowerTerm)
            );
        }).slice(0, 6); // Limit to 6 results for better visibility

        setSearchResults(results);
    }, [searchTerm, allProducts]);

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Boutique', path: '/catalog' },
        { name: 'Notre Histoire', path: '/about' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isHomePage = location.pathname === '/';
    const shouldShowScrolled = isScrolled || !isHomePage;

    return (
        <>
            <nav className={`navbar ${shouldShowScrolled ? 'scrolled' : ''} `}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    {/* Brand / Logo */}
                    <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
                        style={{
                            textDecoration: 'none',
                            transition: 'transform 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: '200px'
                        }}
                        className="logo-container"
                    >
                        <ZaitounibioLogo
                            height={shouldShowScrolled ? 45 : 65}
                            inverted={!shouldShowScrolled}
                            responsive={true}
                            withGlow={true}
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                        {navLinks.map((link) => (
                            link.path === '/' ? (
                                <a
                                    key={link.name}
                                    href="/"
                                    onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
                                    className="nav-link-modern"
                                    style={{
                                        color: shouldShowScrolled ? 'var(--secondary)' : 'white',
                                        opacity: location.pathname === link.path ? 1 : 0.8,
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        textDecoration: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="nav-link-modern"
                                    style={{
                                        color: shouldShowScrolled ? 'var(--secondary)' : 'white',
                                        opacity: location.pathname === link.path ? 1 : 0.8,
                                        fontSize: '0.9rem',
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                        fontWeight: 700
                                    }}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Action Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                        {/* Search Bar */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <AnimatePresence>
                                {isSearchOpen ? (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: '250px', opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        style={{ overflow: 'hidden', marginRight: '0.5rem' }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="Rechercher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            autoFocus
                                            style={{
                                                width: '100%',
                                                padding: '0.6rem 1rem',
                                                borderRadius: '20px',
                                                border: '1px solid var(--primary)',
                                                outline: 'none',
                                                fontSize: '0.9rem',
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                color: 'var(--secondary)'
                                            }}
                                        />
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    setIsSearchOpen(!isSearchOpen);
                                    if (isSearchOpen) setSearchTerm('');
                                }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: shouldShowScrolled ? 'var(--secondary)' : 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {isSearchOpen ? <X size={22} /> : <Search size={22} strokeWidth={2} />}
                            </motion.button>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {isSearchOpen && searchResults.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            marginTop: '1rem',
                                            width: '320px',
                                            background: 'white',
                                            borderRadius: '16px',
                                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                                            overflow: 'hidden',
                                            padding: '0.5rem',
                                            border: '1px solid rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            Résultats
                                        </div>
                                        {searchResults.map(product => (
                                            <Link
                                                key={product.id}
                                                to={`/product/${product.id}`}
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchTerm('');
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    padding: '0.8rem 1rem',
                                                    textDecoration: 'none',
                                                    transition: 'background 0.2s',
                                                    borderRadius: '12px'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                                    <img src={getImageUrl(product.image)} alt={product.name_fr} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)' }}>{product.name_fr}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', fontWeight: 600 }}>{product.price} DH</div>
                                                </div>
                                                <ChevronRight size={16} color="#94a3b8" />
                                            </Link>
                                        ))}
                                        <Link
                                            to="/catalog"
                                            onClick={() => setIsSearchOpen(false)}
                                            style={{
                                                display: 'block',
                                                textAlign: 'center',
                                                padding: '0.8rem',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--primary-dark)',
                                                borderTop: '1px solid #f1f5f9',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            Voir tous les produits
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsCartOpen(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                position: 'relative',
                                color: shouldShowScrolled ? 'var(--secondary)' : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ShoppingBag size={24} strokeWidth={1.5} />
                            <AnimatePresence>
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        style={{
                                            position: 'absolute',
                                            top: '-8px',
                                            right: '-8px',
                                            background: 'var(--primary)',
                                            color: 'var(--secondary)',
                                            fontSize: '0.65rem',
                                            fontWeight: 900,
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Order Button (Desktop) */}
                        <Link to="/catalog" className="btn btn-primary desktop-only" style={{
                            padding: '0.6rem 1.8rem',
                            fontSize: '0.85rem',
                            borderRadius: '12px',
                            background: shouldShowScrolled ? 'var(--secondary)' : 'white',
                            color: shouldShowScrolled ? 'white' : 'var(--secondary)',
                            border: 'none',
                            fontWeight: 800,
                            letterSpacing: '1px'
                        }}>
                            COMMANDER
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-toggle"
                            onClick={() => setIsMobileMenuOpen(true)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: shouldShowScrolled ? 'var(--secondary)' : 'white',
                                cursor: 'pointer',
                                padding: '0.5rem'
                            }}
                        >
                            <Menu size={28} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(18, 42, 22, 0.4)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 2050
                            }}
                        />
                        <motion.div
                            className="mobile-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{ padding: '3rem 2rem', gap: '3rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--secondary)' }}>
                                    <X size={32} strokeWidth={1} />
                                </button>
                            </div>

                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            style={{
                                                fontSize: '2rem',
                                                fontWeight: 800,
                                                color: 'var(--secondary)',
                                                textDecoration: 'none',
                                                fontFamily: 'var(--font-heading)'
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Link
                                    to="/catalog"
                                    className="btn btn-primary"
                                    style={{ padding: '1.2rem', fontSize: '1.1rem', width: '100%', borderRadius: '16px' }}
                                >
                                    Faire mes achats
                                </Link>
                                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    Zaitounibio - Pureté & Terroir
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
