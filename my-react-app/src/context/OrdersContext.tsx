import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface Order {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    adress: string;
    quantite: number;
    message: string;
    produit: string;
}

interface OrdersContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id'>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const addOrder = (order: Omit<Order, 'id'>) => {
        const newOrder = { ...order, id: Date.now() };
        setOrders(prev => [...prev, newOrder]);
    };

    return (
        <OrdersContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within OrdersProvider');
    }
    return context;
};