import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, Truck, XCircle, User, Phone, MapPin, FileDown } from 'lucide-react';
import api from '../../api/axios';
import * as XLSX from 'xlsx';

interface Order {
    id: number;
    items_description: string;
    customer_name: string;
    phone: string;
    city: string;
    address: string;
    status: string;
    created_at: string;
}

const OrderManager: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders/');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            await api.patch(`/orders/${id}/`, { status: newStatus });
            setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        } catch (error) {
            alert('Erreur lors de la mise à jour.');
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'PENDING': return { label: 'EN ATTENTE', color: '#f59e0b', bg: '#fffbeb', icon: <Clock size={14} /> };
            case 'CONFIRMED': return { label: 'CONFIRMÉ', color: '#3b82f6', bg: '#eff6ff', icon: <CheckCircle size={14} /> };
            case 'SHIPPED': return { label: 'EXPÉDIÉ', color: '#8b5cf6', bg: '#f5f3ff', icon: <Truck size={14} /> };
            case 'DELIVERED': return { label: 'LIVRÉ', color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle size={14} /> };
            case 'CANCELLED': return { label: 'ANNULÉ', color: '#ef4444', bg: '#fef2f2', icon: <XCircle size={14} /> };
            default: return { label: status, color: '#64748b', bg: '#f8fafc', icon: <Clock size={14} /> };
        }
    };

    const exportToExcel = () => {
        const data = orders.map(order => ({
            'ID': order.id,
            'Date': new Date(order.created_at).toLocaleDateString('fr-FR'),
            'Client': order.customer_name,
            'Téléphone': order.phone,
            'Ville': order.city,
            'Adresse': order.address,
            'Statut': getStatusInfo(order.status).label,
            'Montage': order.items_description
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Commandes");
        XLSX.writeFile(wb, `commandes_zaitounibio_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                <div>
                    <h1 className="admin-page-title" style={{ color: 'var(--secondary)', marginBottom: '0.2rem', fontSize: 'clamp(1.2rem, 5vw, 2.2rem)' }}>
                        Gestion <span style={{ color: 'var(--primary)' }}>Commandes</span>
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: 500, fontSize: '0.9rem' }}>{orders.length} commandes enregistrées</p>
                </div>
                <button
                    onClick={exportToExcel}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.2rem',
                        background: '#10b981',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                    }}
                    className="admin-card-hover"
                >
                    <FileDown size={18} />
                    Exporter Excel
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1rem'
            }}>
                {loading ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                        <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid rgba(212,175,55,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : orders.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '24px', border: '1px dashed #e2e8f0' }}>
                        <ShoppingBag size={40} color="#cbd5e1" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3 style={{ color: 'var(--secondary)', fontWeight: 700 }}>Aucune commande</h3>
                    </div>
                ) : (
                    orders.map((order, index) => {
                        const status = getStatusInfo(order.status);
                        return (
                            <motion.div
                                layout
                                key={order.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="glass-card admin-card-hover"
                                style={{
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.8rem',
                                    borderLeft: `4px solid ${status.color}`
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{
                                        padding: '0.3rem 0.6rem',
                                        background: status.bg,
                                        color: status.color,
                                        borderRadius: '8px',
                                        fontSize: '0.65rem',
                                        fontWeight: 800,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}>
                                        {status.icon}
                                        {status.label}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>#{order.id}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 600 }}>{new Date(order.created_at).toLocaleDateString('fr-FR')}</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--secondary)', lineHeight: 1.2, marginBottom: '0.4rem' }}>
                                        {order.items_description}
                                    </h3>
                                    <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                                        <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <User size={12} color="var(--primary)" /> {order.customer_name}
                                        </div>
                                        <div style={{ color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Phone size={12} /> {order.phone}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <MapPin size={12} /> {order.city} - <small>{order.address}</small>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
                                    {['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => {
                                        const sInfo = getStatusInfo(s);
                                        const isCurrent = order.status === s;
                                        if (isCurrent) return null;
                                        return (
                                            <button
                                                key={s}
                                                onClick={() => updateStatus(order.id, s)}
                                                style={{
                                                    flex: 1,
                                                    padding: '0.4rem 0.2rem',
                                                    fontSize: '0.6rem',
                                                    fontWeight: 800,
                                                    background: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    color: '#64748b',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.currentTarget.style.borderColor = sInfo.color;
                                                    e.currentTarget.style.color = sInfo.color;
                                                    e.currentTarget.style.background = sInfo.bg;
                                                }}
                                                onMouseOut={(e) => {
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                    e.currentTarget.style.color = '#64748b';
                                                    e.currentTarget.style.background = 'white';
                                                }}
                                            >
                                                {sInfo.label.split(' ')[0]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default OrderManager;
