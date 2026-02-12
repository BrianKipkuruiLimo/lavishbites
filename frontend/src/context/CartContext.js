"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("lavishbite-cart");
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart data:", e);
            }
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("lavishbite-cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isHydrated]);

    const addToCart = (product, qty = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const cartNutritionSummary = cartItems.reduce(
        (totals, item) => ({
            calories: totals.calories + (item.nutrition?.calories || 0) * item.quantity,
            protein: totals.protein + (item.nutrition?.protein || 0) * item.quantity,
            fiber: totals.fiber + (item.nutrition?.fiber || 0) * item.quantity,
            sodium: totals.sodium + (item.nutrition?.sodium || 0) * item.quantity,
        }),
        { calories: 0, protein: 0, fiber: 0, sodium: 0 }
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                cartNutritionSummary,
                isHydrated,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within <CartProvider>");
    return ctx;
}
