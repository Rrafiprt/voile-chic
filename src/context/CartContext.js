import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToBag = (prod, col, qty) => {
        const bagID = `${prod.id}-${col}`;
        const exist = cart.find(x => x.bagID === bagID);
        if (exist) {
            setCart(cart.map(x => x.bagID === bagID ? { ...x, qty: x.qty + qty } : x));
        } else {
            setCart([...cart, { ...prod, bagID, color: col, qty }]);
        }
        alert(`${prod.name} added to bag`); // Anda bisa mengganti ini dengan sistem Toast terpisah
    };

    const removeFromBag = (bagID) => {
        setCart(cart.filter(item => item.bagID !== bagID));
    };

    const clearCart = () => {
        setCart([]); // Mengubah keranjang menjadi array kosong
    };

    const updateQty = (bagID, delta) => {
        setCart(cart.map(item => {
            if (item.bagID === bagID) {
                const newQty = item.qty + delta;
                return { ...item, qty: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    return (
        <CartContext.Provider value={{ cart, addToBag, removeFromBag, updateQty, setCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);