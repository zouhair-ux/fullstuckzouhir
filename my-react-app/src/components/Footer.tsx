import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import ZaitounibioLogo from './ZaitounibioLogo';

const Footer: React.FC = () => {
    return (
        <footer id="contact" style={{ padding: '8rem 0 4rem 0', background: 'var(--secondary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative element */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'var(--primary)',
                opacity: 0.05,
                borderRadius: '50%',
                filter: 'blur(50px)'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem'
                }}>
                    <div style={{ maxWidth: '350px' }}>
                        <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                            <ZaitounibioLogo
                                height={100}
                                inverted={true}
                                responsive={true}
                                withGlow={true}
                            />
                        </Link>
                        <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '2.5rem' }}>
                            Nous connectons les produits les plus purs de la nature marocaine directement à votre foyer,
                            pour une santé éclatante et un bien-être durable.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[
                                { Icon: Instagram, link: 'https://www.instagram.com/zaitounibio?igsh=bDd3cW4ydGJlZDV4' },
                                { Icon: Facebook, link: 'https://www.facebook.com/profile.php?id=61587589012707' }
                            ].map(({ Icon, link }, i) => (
                                <a key={i} href={link} target="_blank" rel="noopener noreferrer" style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    transition: 'var(--transition)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--primary)';
                                        e.currentTarget.style.color = 'var(--secondary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', position: 'relative' }}>
                            Quick Links
                            <span style={{ position: 'absolute', bottom: '-0.5rem', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }} />
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {[
                                { name: 'Accueil', path: '/' },
                                { name: 'Boutique', path: '/catalog' },
                                { name: 'À Propos', path: '/about' },
                            ].map((link) => (
                                <li key={link.name} style={{ marginBottom: '1rem' }}>
                                    <Link to={link.path} style={{ color: 'white', textDecoration: 'none', opacity: 0.7, transition: '0.3s' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem', position: 'relative' }}>
                            Contactez-nous
                            <span style={{ position: 'absolute', bottom: '-0.5rem', left: 0, width: '30px', height: '2px', background: 'var(--primary)' }} />
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
                                <Mail size={20} className="text-primary" />
                                <span>Zaitounibio6@gmail.com</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
                                <Phone size={20} className="text-primary" />
                                <span>+212 638-766104</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
                                <MapPin size={20} className="text-primary" />
                                <span>Ataouia, Maroc</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '6rem', padding: '2rem 0 0 0', borderTop: '1px solid rgba(255,255,255,0.05)', opacity: 0.5, fontSize: '0.9rem' }}>
                    <p>&copy; 2026 Zaitounibio. Cultivé avec Passion. Tous droits réservés.</p>
                </div>
            </div>

            {/* WhatsApp Float */}
            <a href="https://wa.me/212638766104?text=Bonjour, je suis intéressé par vos produits naturels."
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    background: '#25D366',
                    color: 'white',
                    borderRadius: '50%',
                    width: '64px',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
                    zIndex: 1000,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) translateY(0)')}
                target="_blank"
                rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </footer>
    );
};

export default Footer;
