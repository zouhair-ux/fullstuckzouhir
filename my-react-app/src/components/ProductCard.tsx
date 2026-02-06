import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../api/axios';

interface ProductCardProps {
  id: number;
  name: string;
  name_ar?: string;
  price: string;
  category: string;
  image: string;
  description: string;
  origin: string;
  benefits: string;
  weight?: string;
  is_promo?: boolean;
  discount_price?: string;
  onOrder: (weight?: string, quantity?: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, name_ar, price, image, onOrder, weight, is_promo, discount_price }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Price calculation
  const originalPrice = parseFloat(price.replace(/[^\d.]/g, ''));
  const promoPrice = discount_price ? parseFloat(discount_price.replace(/[^\d.]/g, '')) : 0;

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const currentPrice = is_promo && promoPrice > 0 ? promoPrice : originalPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id, name, name_ar, price: currentPrice.toString(), image, weight }, weight, 1);
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOrder(weight, 1);
  };

  return (
    <motion.div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Enforce full height to match grid cell
        justifyContent: 'space-between'
      }}
    >
      <div className="product-card-image-wrap">
        <motion.img
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.8 }}
          src={getImageUrl(image)}
          alt={name}
          className="product-card-img"
        />

        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem' }}>
          {is_promo && (
            <div style={{
              padding: '0.3rem 0.6rem',
              background: '#ef4444',
              color: 'white',
              borderRadius: '8px',
              fontSize: '0.6rem',
              fontWeight: 800,
              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)'
            }}>
              PROMO
            </div>
          )}
        </div>
      </div>

      <div className="product-card-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--secondary)',
            margin: '0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '2.4em', // Fixed height for 2 lines approximately
            lineHeight: '1.2'
          }}>
            {name}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {name_ar && (
              <span style={{ fontSize: '0.85rem', fontFamily: 'Amiri', color: '#94a3b8', direction: 'rtl' }}>
                {name_ar}
              </span>
            )}
            {weight && (
              <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                {weight}
              </span>
            )}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
          {is_promo && promoPrice > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#cbd5e1' }}>{originalPrice} DH</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>{promoPrice} <small>DH</small></span>
            </div>
          ) : (
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{originalPrice} <small style={{ fontSize: '0.7rem' }}>DH</small></span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
          <button
            onClick={handleAddToCart}
            style={{
              padding: '0.5rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: 'white',
              color: 'var(--secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0 // Prevent crushing
            }}
          >
            <ShoppingCart size={16} />
          </button>
          <button
            onClick={handleOrderNow}
            style={{
              flex: 1,
              padding: '0.5rem 0.2rem', // Reduced horizontal padding
              borderRadius: '10px',
              border: 'none',
              background: 'var(--secondary)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.7rem', // Smaller font
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem', // Tighter gap
              whiteSpace: 'nowrap', // Force single line
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            <Zap size={14} fill="white" /> COMMANDER
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
