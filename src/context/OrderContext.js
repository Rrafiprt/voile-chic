import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    // State untuk menyimpan daftar semua pesanan
    const [orders, setOrders] = useState([]);

    // Fungsi untuk menambah pesanan baru ke daftar teratas
    const addOrder = (newOrder) => {
        setOrders(prevOrders => [newOrder, ...prevOrders]);
    };

    // Fungsi untuk membatalkan pesanan
    const cancelOrder = (id) => {
        setOrders(prevOrders => prevOrders.filter(o => o.id !== id));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    );
};