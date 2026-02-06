import { BrowserRouter as Router, Routes, Route, useSearchParams, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import VideoSection from './components/VideoSection'
import TrustBadges from './components/TrustBadges'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import OrderForm from './components/OrderForm'
import About from './components/About'
import Catalog from './components/Catalog'
import { OrdersProvider } from './context/OrdersContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import { useState, useEffect } from 'react'
import Login from './components/Dashboard/Login'
import DashboardHome from './components/Dashboard/DashboardHome'
import ProductManager from './components/Dashboard/ProductManager'
import OrderManager from './components/Dashboard/OrderManager'

import DashboardLayout from './components/Dashboard/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import CartDrawer from './components/CartDrawer'
import ProductDetails from './components/ProductDetails'
import api from './api/axios'
import ScrollToTop from './components/ScrollToTop'

const Home = ({ onOrder }: { onOrder: (product: any, weight?: string, quantity?: number) => void }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch PROMO products or filtered by category
        // If category is selected, we filter by category but can still order by views/created_at
        const endpoint = categoryFilter
          ? `/products/?category=${categoryFilter}`
          : '/products/?is_promo=true'; // Show ONLY promotions on home

        const response = await api.get(endpoint);
        // If the API returns pagination { results: [] }, handle it.
        // Assuming current setup returns array directly or valid list.
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryFilter]);

  useEffect(() => {
    if (categoryFilter) {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [categoryFilter, loading]);

  const filteredProducts = categoryFilter
    ? products.filter(p => String(p.category) === categoryFilter)
    : products;

  return (
    <>
      <Hero />
      <TrustBadges />
      <section id="products" style={{ padding: 'clamp(3rem, 10vw, 7rem) 0', background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto clamp(2rem, 8vw, 5rem) auto' }}>
            <h2 className="section-title">
              {categoryFilter && filteredProducts.length > 0
                ? `Nos Produits : ${filteredProducts[0]?.category_name || ''}`
                : "Promotions & Offres Spéciales"}
            </h2>

          </div>
          <div className="product-grid-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(var(--grid-min-width, 280px), 1fr))',
            gap: 'var(--grid-gap, 2.5rem)'
          }}>
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
                <div className="loader">Chargement...</div>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name_fr}
                  price={`${product.price} DH`}
                  category={product.category_name || 'Divers'}
                  image={product.image}
                  description={product.description_fr}
                  origin={product.origin_fr || 'Maroc'}
                  benefits={product.benefits_fr || 'Naturel'}
                  weight={product.weight}
                  onOrder={(weight, qty) => onOrder(product, weight, qty)}
                  is_promo={product.is_promo}
                  discount_price={product.discount_price}
                />
              ))
            )}
            {!loading && filteredProducts.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                Aucun produit trouvé dans cette catégorie pour le moment...
              </div>
            )}
          </div>
          {categoryFilter && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button
                onClick={() => window.location.href = '/'}
                className="btn"
                style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}
              >
                Voir tous les produits
              </button>
            </div>
          )}
        </div>
      </section>
      <VideoSection />

      {/* Mobile Grid Optimization Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          #products .container { padding: 0 1rem; }
          .product-grid-responsive {
            --grid-min-width: 140px;
            --grid-gap: 0.75rem;
          }
        }
      `}} />
    </>
  );
};

const AppContent = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal } = useCart();

  const handleOrder = (product: any, weight?: string, quantity: number = 1) => {
    const price = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^\d.]/g, '')) : product.price;
    const subtotal = price * quantity;
    const deliveryFee = 45;
    const total = subtotal + deliveryFee;

    setSelectedProduct(`${product.name_fr || product.name}${weight ? ' (' + weight + ')' : ''} x${quantity} (Total: ${total} DH [${subtotal} + ${deliveryFee} liv])`);
    setShowOrderForm(true);
  };

  const handleCheckout = () => {
    const deliveryFee = 45;
    const total = cartTotal + deliveryFee;
    const orderItems = cartItems.map(item => `${item.name}${item.weight ? ' (' + item.weight + ')' : ''} (x${item.quantity})`).join(', ');
    setSelectedProduct(`Panier: ${orderItems} (Total: ${total} DH [${cartTotal} + ${deliveryFee} liv])`);
    setShowOrderForm(true);
    setIsCartOpen(false);
  };

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <div className="app">
      <ScrollToTop />
      {!isDashboard && <Navbar />}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
      <Routes>
        <Route path="/" element={<Home onOrder={handleOrder} />} />
        <Route path="/product/:id" element={<ProductDetails onOrder={handleOrder} />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog onOrder={(product, weight, qty) => handleOrder(product, weight, qty)} />} />
        <Route path="/contact" element={<div style={{ padding: '8rem 0' }} className="container"><h1>Contact</h1><p>Contactez-nous...</p></div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="orders" element={<OrderManager />} />
        </Route>

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
      {showOrderForm && <OrderForm productName={selectedProduct} onClose={() => setShowOrderForm(false)} />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <Router>
            <AppContent />
          </Router>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
