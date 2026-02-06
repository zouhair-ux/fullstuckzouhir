import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, Package } from 'lucide-react';
import api, { getImageUrl } from '../../api/axios';

interface Category {
    id: number;
    name_fr: string;
}

interface Product {
    id: number;
    name_fr: string;
    name_ar: string;
    description_fr: string;
    description_ar: string;
    price: string;
    category: number;
    category_name?: string;
    image: string | null;
    weight?: string;
    is_promo?: boolean;
    discount_price?: string | null;
}

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name_fr: '',
        name_ar: '',
        description_fr: '',
        description_ar: '',
        price: '',
        category: '',
        weight: '',
        is_promo: false,
        discount_price: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/products/'),
                api.get('/categories/')
            ]);

            const prodData = Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.results || [];
            const catData = Array.isArray(catRes.data) ? catRes.data : catRes.data.results || [];

            setProducts(prodData);
            setCategories(catData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/');
            const data = Array.isArray(response.data) ? response.data : response.data.results || [];
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
            try {
                await api.delete(`/products/${id}/`);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                alert('Erreur lors de la suppression.');
            }
        }
    };

    const handleOpenModal = (product: Product | null = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name_fr: product.name_fr,
                name_ar: product.name_ar || '',
                description_fr: product.description_fr,
                description_ar: product.description_ar || '',
                price: product.price,
                category: product.category.toString(),
                weight: product.weight || '',
                is_promo: product.is_promo || false,
                discount_price: product.discount_price || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name_fr: '',
                name_ar: '',
                description_fr: '',
                description_ar: '',
                price: '',
                category: categories[0]?.id.toString() || '',
                weight: '',
                is_promo: false,
                discount_price: ''
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingProduct && !imageFile) {
            alert('Veuillez sélectionner une image pour le nouveau produit.');
            return;
        }

        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            // Handle specific fields
            if (key === 'discount_price') {
                if (formData.is_promo && value) {
                    data.append(key, value.toString());
                }
                return;
            }
            if (key === 'is_promo') {
                data.append(key, value ? 'true' : 'false');
                return;
            }

            if (value !== null && value !== undefined && value !== '') {
                data.append(key, value.toString());
            }
        });

        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (editingProduct) {
                await api.patch(`/products/${editingProduct.id}/`, data);
            } else {
                await api.post('/products/', data);
            }
            await fetchProducts();
            setIsModalOpen(false);
            alert('Produit enregistré avec succès !');
        } catch (error: any) {
            console.error('Save error:', error);
            const errorData = error.response?.data;
            let errorMessage = 'Erreur lors de l’enregistrement.';

            if (errorData) {
                errorMessage += '\n' + Object.entries(errorData)
                    .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                    .join('\n');
            }

            alert(errorMessage);
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <div style={{
                marginBottom: 'clamp(1.5rem, 5vh, 2.5rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h1 className="admin-page-title" style={{ color: 'var(--secondary)', marginBottom: '0.2rem', fontSize: 'clamp(1.2rem, 5vw, 2.2rem)' }}>
                        Gestion <span style={{ color: 'var(--primary)' }}>Produits</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 500, fontSize: '0.9rem' }}>Inventaire en temps réel</p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenModal()}
                    style={{
                        padding: '0.7rem 1.4rem',
                        background: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 12px rgba(18, 42, 22, 0.1)',
                    }}
                >
                    <Plus size={20} color="var(--primary)" /> Ajouter un Produit
                </motion.button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid rgba(212,175,55,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '24px', border: '1px dashed #e2e8f0' }}>
                        <Package size={40} color="#cbd5e1" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3 style={{ color: 'var(--secondary)', fontWeight: 700 }}>Aucun produit</h3>
                    </div>
                ) : (
                    products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="glass-card admin-card-hover"
                            style={{
                                padding: '0.8rem 1.2rem',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                flexWrap: 'nowrap'
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                background: '#f8fafc',
                                flexShrink: 0
                            }}>
                                {product.image ? (
                                    <img src={getImageUrl(product.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
                                        <Package size={20} />
                                    </div>
                                )}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', background: 'rgba(212, 175, 55, 0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                        {product.category_name}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {product.name_fr}
                                    </h4>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Amiri', direction: 'rtl' }}>
                                        {product.name_ar}
                                    </h4>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--secondary)' }}>
                                    {product.discount_price || product.price} <small style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>DH</small>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <button onClick={() => handleOpenModal(product)} style={{ padding: '0.5rem', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', color: '#3b82f6', cursor: 'pointer' }}>
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(product.id)} style={{ padding: '0.5rem', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', cursor: 'pointer' }}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(12, 22, 14, 0.5)', backdropFilter: 'blur(4px)' }} />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            style={{
                                width: '100%',
                                maxWidth: '750px',
                                background: 'white',
                                borderRadius: '20px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: '98vh',
                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)'
                            }}
                        >
                            <div style={{ padding: '0.8rem 1.2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{editingProduct ? 'Modifier Produit' : 'Nouveau Produit'}</h3>
                                <button onClick={() => setIsModalOpen(false)} style={{ background: '#f8fafc', border: 'none', padding: '0.4rem', borderRadius: '8px', cursor: 'pointer' }}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '1.2rem', overflowY: 'auto' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>NOM (FR) *</label>
                                                <input type="text" required value={formData.name_fr} onChange={(e) => setFormData({ ...formData, name_fr: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem', textAlign: 'right' }}>الاسم (AR)</label>
                                                <input type="text" value={formData.name_ar} onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })} dir="rtl" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'Amiri' }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <div>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>DESCRIPTION (FR) *</label>
                                                <textarea required rows={3} value={formData.description_fr} onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem', resize: 'none' }} />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem', textAlign: 'right' }}>الوصف (AR)</label>
                                                <textarea rows={3} value={formData.description_ar} onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })} dir="rtl" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', resize: 'none', fontFamily: 'Amiri' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '12px', border: '1px dashed #cbd5e1', position: 'relative', background: '#f8fafc', overflow: 'hidden', flexShrink: 0 }}>
                                                <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }} />
                                                {imageFile ? (<img src={URL.createObjectURL(imageFile)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) : editingProduct?.image ? (<img src={getImageUrl(editingProduct.image)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />) : (<div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={20} color="#94a3b8" /></div>)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>CATÉGORIE *</label>
                                                <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.85rem' }}>
                                                    <option value="">Sélectionner...</option>
                                                    {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name_fr}</option>))}
                                                </select>
                                                <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginTop: '0.5rem', marginBottom: '0.3rem' }}>POIDS / VOL.</label>
                                                <input type="text" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} placeholder="ex: 250ml" style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }} />
                                            </div>
                                        </div>

                                        <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                                <div>
                                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '0.3rem' }}>PRIX (DH) *</label>
                                                    <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontWeight: 800, color: 'var(--primary)' }} />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
                                                        <input type="checkbox" checked={formData.is_promo} onChange={(e) => setFormData({ ...formData, is_promo: e.target.checked })} /> Promotion
                                                    </label>
                                                    {formData.is_promo && <input type="number" placeholder="Promo" value={formData.discount_price} onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })} style={{ marginTop: '0.4rem', width: '100%', padding: '0.4rem', borderRadius: '6px', border: '1px solid #fee2e2' }} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" style={{ width: '100%', padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}>
                                    {editingProduct ? 'Enregistrer les Modifications' : 'Publier le Produit'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductManager;
