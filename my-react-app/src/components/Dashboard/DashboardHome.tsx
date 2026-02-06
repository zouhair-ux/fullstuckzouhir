import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, Calendar } from 'lucide-react';
import api from '../../api/axios';

const DashboardHome: React.FC = () => {
    const [data, setData] = useState<{ date: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/orders/daily_stats/');
                const formattedData = response.data.map((item: any) => ({
                    ...item,
                    date: new Date(item.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
                }));
                setData(formattedData);

                const total = response.data.reduce((acc: number, curr: any) => acc + curr.count, 0);
                setTotalOrders(total);
            } catch (error) {
                console.error("Erreur lors du chargement des statistiques", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center text-muted">Chargement des statistiques...</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="admin-page-title" style={{ marginBottom: '2rem', color: '#1a2f1e' }}>
                Tableau de Bord
            </h1>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
                marginBottom: '3rem'
            }}>
                <div style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'rgba(212, 175, 55, 0.1)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Commandes du mois</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a2f1e' }}>{totalOrders}</div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div style={{
                background: 'white',
                padding: 'clamp(1rem, 2vw, 2rem)', // Responsive padding
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            padding: '0.6rem',
                            borderRadius: '10px',
                            background: '#f8fafc',
                            color: '#64748b'
                        }}>
                            <TrendingUp size={20} />
                        </div>
                        <h2 style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontWeight: 700, margin: 0 }}>Activité Récente</h2>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        background: '#f1f5f9',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px'
                    }}>
                        <Calendar size={14} />
                        Ce mois
                    </div>
                </div>

                <div style={{ height: 'clamp(300px, 50vh, 400px)', width: '100%', minHeight: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 10, // Reduced right margin for mobile
                                left: -20, // Negative left margin to fit better on small screens
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                dy={10}
                                interval={window.innerWidth < 768 ? 2 : 0} // Skip ticks on mobile
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                }}
                                cursor={{ fill: '#f8fafc' }}
                            />
                            <Bar
                                dataKey="count"
                                name="Commandes"
                                fill="var(--primary)"
                                radius={[6, 6, 0, 0]}
                                barSize={32}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
