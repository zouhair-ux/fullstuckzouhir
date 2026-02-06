import React from 'react';
import { useOrders } from '../context/OrdersContext';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, Home } from 'lucide-react';
import ZaitounibioLogo from './ZaitounibioLogo';

const AdminDashboard: React.FC = () => {
    const { orders } = useOrders();
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{
            padding: '5rem 0',
            minHeight: '100vh',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-lg)',
            margin: '2rem',
            boxShadow: 'var(--shadow-lg)'
        }}>
            <div className="container">
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    padding: '2rem',
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <ZaitounibioLogo
                            height={150}
                            responsive={true}
                            withGlow={true}
                            inverted={true}
                        />
                    </div>
                    <h1 style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        fontWeight: 700
                    }}>Admin Dashboard</h1>
                    <p style={{
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        margin: '0 0 2rem 0'
                    }}>Gestion des commandes - Produits traditionnels marocains</p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button
                            onClick={handleRefresh}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <RefreshCcw size={18} />
                            Actualiser
                        </button>
                        <button
                            onClick={handleGoHome}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(255, 255, 255, 0.2)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backdropFilter: 'blur(10px)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <Home size={18} />
                            Accueil
                        </button>
                    </div>
                </div>
                <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-md)',
                    overflow: 'hidden'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        color: 'var(--secondary)',
                        marginBottom: '2rem',
                        textAlign: 'center',
                        fontWeight: 600
                    }}>📋 Commandes Reçues</h2>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: 'white',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden'
                    }}>
                        <thead style={{
                            background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%)',
                            color: 'white'
                        }}>
                            <tr>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>👤 Nom</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>👤 Prénom</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>📞 Téléphone</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>🏠 Adresse</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>📦 Quantité</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>🛒 Produit</th>
                                <th style={{ padding: '1.2rem 1rem', textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>💬 Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id} style={{
                                    background: index % 2 === 0 ? 'var(--bg-light)' : 'white',
                                    transition: 'var(--transition)',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'var(--bg-light)' : 'white'}
                                >
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 500 }}>{order.nom}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 500 }}>{order.prenom}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>{order.telephone}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>{order.adress}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 600, color: 'var(--primary)' }}>{order.quantite}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 600 }}>{order.produit}</td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', fontStyle: 'italic', color: 'var(--text-muted)' }}>{order.message || 'Aucun message'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            color: 'var(--text-muted)',
                            fontSize: '1.2rem'
                        }}>
                            📭 Aucune commande reçue pour le moment
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;