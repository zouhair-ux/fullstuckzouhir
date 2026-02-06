import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    name_ar?: string; // Added Arabic Name
    price: number | string;
    image: string;
    quantity: number;
    weight?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, weight?: string, quantity?: number) => void;
    removeFromCart: (productId: number, weight?: string) => void;
    updateQuantity: (productId: number, quantity: number, weight?: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    deliveryFee: number;
    totalWithDelivery: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('zaitounibio_cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart");
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('zaitounibio_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: any, weight?: string, quantity: number = 1) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.weight === weight);
            if (existingItem) {
                return prev.map(item =>
                    (item.id === product.id && item.weight === weight)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            // Extract numeric price
            const priceNum = typeof product.price === 'string'
                ? parseFloat(product.price.replace(/[^\d.]/g, ''))
                : product.price;

            return [...prev, {
                id: product.id,
                name: product.name_fr || product.name,
                name_ar: product.name_ar, // Capture Arabic Name
                price: priceNum,
                image: product.image,
                quantity: quantity,
                weight: weight
            }];
        });
        setIsCartOpen(true); // Open cart drawer on add
    };

    const removeFromCart = (productId: number, weight?: string) => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && item.weight === weight)));
    };

    const updateQuantity = (productId: number, quantity: number, weight?: string) => {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            (item.id === productId && item.weight === weight) ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('zaitounibio_cart');
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => {
        const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
        return total + (price * item.quantity);
    }, 0);

    const deliveryFee = cartItems.length > 0 ? 45 : 0;
    const totalWithDelivery = cartTotal + deliveryFee;

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            deliveryFee,
            totalWithDelivery,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
