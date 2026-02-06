import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ShoppingCart,
    LogOut,
    Menu,
    X,

    Search,
} from 'lucide-react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ZaitounibioLogo from '../ZaitounibioLogo';

const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

    // Add effect to handle resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        // We only want to set initial state or drastic changes, maybe just default false on mobile is enough.
        // Actually, let's just leave the initial state check.
        // Moving to event listener might be too aggressive if user manually opened it.
    }, []);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { title: 'Tableau de bord', icon: <Package size={22} />, path: '/dashboard' },
        { title: 'Produits', icon: <Package size={22} />, path: '/dashboard/products' },
        { title: 'Commandes', icon: <ShoppingCart size={22} />, path: '/dashboard/orders' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f7f6', color: 'var(--secondary)', position: 'relative', overflowX: 'hidden' }}>
            {/* Sidebar / Drawer Mobile Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="admin-mobile-only"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 150
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar / Drawer */}
            <aside
                className={`admin-sidebar ${isSidebarOpen ? 'expanded open' : 'collapsed'}`}
                style={{
                    background: 'linear-gradient(180deg, #1a2f1e 0%, #0c160e 100%)',
                    color: 'white',
                    padding: isSidebarOpen ? '2rem 1rem' : '1.5rem 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '15px 0 40px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarOpen ? 'space-between' : 'center',
                    marginBottom: 'clamp(2rem, 5vh, 4rem)',
                    padding: isSidebarOpen ? '0 0.5rem' : '0'
                }}>
                    <div style={{ transform: `scale(${isSidebarOpen ? 1 : 0.7})`, transition: 'transform 0.4s' }}>
                        <ZaitounibioLogo
                            height={70}
                            inverted={true}
                            responsive={false}

                            withGlow={true}
                        />
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="admin-mobile-only"
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.5rem' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => {
                                    if (window.innerWidth <= 1024) setIsSidebarOpen(false);
                                }}
                                className={`admin-sidebar-item ${isActive ? 'active' : ''}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                                    gap: isSidebarOpen ? '1rem' : '0',
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    textDecoration: 'none',
                                    color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                                    background: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    whiteSpace: 'nowrap',
                                    border: isActive ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent'
                                }}
                            >
                                <span style={{
                                    color: isActive ? 'var(--primary)' : 'inherit',
                                    transition: 'transform 0.3s ease',
                                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                }}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ fontWeight: isActive ? 700 : 500, fontSize: '0.95rem' }}
                                    >
                                        {item.title}
                                    </motion.span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                        gap: isSidebarOpen ? '0.8rem' : '0',
                        padding: '1rem',
                        borderRadius: '16px',
                        background: 'rgba(255, 68, 68, 0.05)',
                        color: '#ff6b6b',
                        border: '1px solid rgba(255, 68, 68, 0.1)',
                        cursor: 'pointer',
                        marginTop: 'auto',
                        transition: 'all 0.3s'
                    }}
                >
                    <LogOut size={20} />
                    {isSidebarOpen && <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Quitter</span>}
                </button>
            </aside>

            {/* Main Content */}
            <main className={`admin-main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`} style={{ display: 'flex', flexDirection: 'column', background: 'transparent', minWidth: 0 }}>
                {/* Header */}
                <header className="admin-header-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 90 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 3vw, 1.5rem)' }}>
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: 'white',
                                border: '1px solid rgba(0,0,0,0.05)',
                                cursor: 'pointer',
                                color: 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}
                        >
                            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>

                        {/* Interactive Search */}
                        <div className="admin-desktop-only" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Search
                                style={{ position: 'absolute', left: '1rem', color: '#94a3b8' }}
                                size={16}
                            />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                style={{
                                    padding: '0.7rem 1rem 0.7rem 2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    width: '240px',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    background: '#f8f9fa'
                                }}
                            />
                        </div>

                        {/* Mobile Brand */}
                        <div className="admin-mobile-only" style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-1px', color: 'var(--secondary)' }}>
                            ZAITOUNI<span style={{ color: 'var(--primary)' }}>BIO</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.4rem, 2vw, 1rem)' }}>
                        {/* Profile Pill */}
                        <div style={{
                            height: '40px',
                            padding: '0 0.4rem 0 0.8rem',
                            background: 'white',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}>
                            <div className="admin-desktop-only">
                                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--secondary)' }}>Admin</div>
                            </div>
                            <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '8px',
                                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 900,
                                color: 'white',
                                fontSize: '12px'
                            }}>
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Container */}
                <div style={{ padding: 'var(--admin-fluid-pad)', flex: 1, minHeight: 0 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
