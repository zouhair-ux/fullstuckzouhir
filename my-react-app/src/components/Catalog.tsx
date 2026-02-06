import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Droplets, Leaf, Thermometer, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from './ProductCard';

// Fallback images if API doesn't provide them
import honeyImg from '../assets/cat-honey.jpg';
import oilsImg from '../assets/cat-oil.jpg';
import amlouImg from '../assets/cat-amlou.jpg';
import promoImg from '../assets/cat-promo.png';

interface Category {
    id: number;
    name_fr: string;
    name_ar: string;
    description_fr: string;
    description_ar: string;
    image: string;
}

interface CatalogProps {
    onOrder: (product: any, weight?: string, quantity?: number) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onOrder }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);

    const categoryId = searchParams.get('category');
    const selectedCategory = categories.find(c => c.id.toString() === categoryId);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setProductsLoading(true);
            try {
                // Fetch filtered by category OR all products
                const endpoint = categoryId
                    ? `/products/?category=${categoryId}`
                    : '/products/';

                const response = await api.get(endpoint);
                const data = Array.isArray(response.data) ? response.data : response.data.results || [];
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setProductsLoading(false);
            }
        };
        fetchProducts();
    }, [categoryId]);

    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('miel')) return <Thermometer className="text-primary" size={20} />;
        if (n.includes('huile')) return <Droplets className="text-primary" size={20} />;
        if (n.includes('amlou')) return <Leaf className="text-primary" size={20} />;
        return <Tag className="text-primary" size={20} />;
    };

    const getFallbackImage = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('miel')) return honeyImg;
        if (n.includes('huile')) return oilsImg;
        if (n.includes('amlou')) return amlouImg;
        return promoImg;
    };

    const handleCategoryClick = (id: number) => {
        setSearchParams({ category: String(id) });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearCategory = () => {
        setSearchParams({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ background: 'var(--bg-light)', minHeight: '100vh', paddingTop: '80px' }}>
            <div className="container" style={{ paddingBottom: '6rem' }}>

                {/* Header Logic */}
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '4rem auto 5rem auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{
                            color: 'var(--primary-dark)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '1rem'
                        }}>
                            Zaitounibio - متجر
                        </span>

                        {categoryId && selectedCategory ? (
                            <>
                                <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--secondary)' }}>
                                    {selectedCategory.name_fr}
                                </h1>
                                <button
                                    onClick={clearCategory}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        background: 'transparent', border: '1px solid var(--text-muted)',
                                        padding: '0.5rem 1.5rem', borderRadius: '30px',
                                        cursor: 'pointer', color: 'var(--text-muted)', fontWeight: 600,
                                        marginTop: '1rem'
                                    }}
                                >
                                    <ArrowLeft size={16} /> Retour aux collections
                                </button>
                            </>
                        ) : (
                            <>
                                <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                                    Collections Exclusives <br />
                                    <span style={{ fontSize: '0.8em', color: 'var(--primary)', fontFamily: 'Amiri' }}>مجموعات حصرية</span>
                                </h1>

                            </>
                        )}
                    </motion.div>
                </div>

                {/* Conditional Render: Products Grid OR Categories Grid */}
                {categoryId ? (
                    <div className="catalog-products-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(var(--grid-min-width, 280px), 1fr))',
                        gap: 'var(--grid-gap, 2.5rem)'
                    }}>
                        {productsLoading ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                                <div className="loader">Chargement des produits...</div>
                            </div>
                        ) : products.length > 0 ? (
                            products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }} // Enforce full height
                                >
                                    <ProductCard
                                        id={product.id}
                                        name={product.name_fr}
                                        name_ar={product.name_ar} // Pass Arabic Name
                                        price={`${product.price} DH`}
                                        category={product.category_name || selectedCategory?.name_fr || 'Divers'}
                                        image={product.image}
                                        description={product.description_fr}
                                        origin={product.origin_fr || 'Maroc'}
                                        benefits={product.benefits_fr || 'Naturel'}
                                        weight={product.weight}
                                        onOrder={(weight, qty) => onOrder(product, weight, qty)}
                                        is_promo={product.is_promo}
                                        discount_price={product.discount_price}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                                Aucun produit disponible dans cette collection pour le moment.
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        padding: '0 1rem'
                    }}>
                        {loading ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                                <div className="loader">Chargement...</div>
                            </div>
                        ) : (
                            categories.map((cat, idx) => (
                                <motion.div
                                    key={cat.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover="hover"
                                    onClick={() => handleCategoryClick(cat.id)}
                                    style={{
                                        height: '500px',
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)'
                                    }}
                                >
                                    {/* Background Image with Zoom Effect */}
                                    <motion.div
                                        variants={{ hover: { scale: 1.1 } }}
                                        transition={{ duration: 0.8 }}
                                        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                                    >
                                        <img
                                            src={cat.image || getFallbackImage(cat.name_fr)}
                                            alt={cat.name_fr}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        {/* Gradient Overlay */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)'
                                        }} />
                                    </motion.div>

                                    {/* Content Layer */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        padding: '2.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        color: 'white'
                                    }}>
                                        <motion.div
                                            variants={{ hover: { y: -10 } }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                                                    padding: '8px', borderRadius: '12px', color: 'var(--primary)'
                                                }}>
                                                    {getIcon(cat.name_fr)}
                                                </div>
                                                <span style={{
                                                    textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700,
                                                    color: 'var(--primary)'
                                                }}>
                                                    Collection
                                                </span>
                                            </div>

                                            <h2 style={{
                                                fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)',
                                                marginBottom: '0.5rem', lineHeight: 1
                                            }}>
                                                {cat.name_fr}
                                            </h2>
                                            <h3 style={{
                                                fontSize: '1.8rem', fontFamily: 'Amiri', fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                                                marginBottom: '1rem', direction: 'rtl'
                                            }}>
                                                {cat.name_ar}
                                            </h3>

                                            <motion.p
                                                variants={{ hover: { opacity: 1, height: 'auto', marginBottom: '1.5rem' } }}
                                                initial={{ opacity: 0.8, height: 'auto', marginBottom: '0' }}
                                                style={{
                                                    fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)',
                                                    maxWidth: '90%', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                                }}
                                            >
                                                {cat.description_fr}
                                            </motion.p>

                                            <motion.div
                                                variants={{ hover: { opacity: 1, x: 0 } }}
                                                initial={{ opacity: 0.8, x: 0 }}
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '1.5rem' }}
                                            >
                                                <span style={{ fontSize: '1rem', fontWeight: 700, borderBottom: '2px solid var(--primary)' }}>
                                                    Découvrir la gamme
                                                </span>
                                                <ArrowRight size={20} color="var(--primary)" />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Grid Optimization Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .catalog-products-grid {
                        --grid-min-width: 140px;
                        --grid-gap: 0.75rem;
                    }
                }
            `}} />
        </div>
    );
};

export default Catalog;
