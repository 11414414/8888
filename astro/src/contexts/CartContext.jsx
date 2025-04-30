// /src/contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("cart_id");
    if (existing) setCartId(existing);
  }, []);

  useEffect(() => {
    if (!cartId) return;
    fetch(`${import.meta.env.PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}`)
      .then((res) => res.json())
      .then((data) => setCart(data.cart))
      .catch(console.error);
  }, [cartId]);

  async function createCart() {
    const res = await fetch(`${import.meta.env.PUBLIC_MEDUSA_BACKEND_URL}/store/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_TOKEN,
      },
    });
    const data = await res.json();
    localStorage.setItem("cart_id", data.cart.id);
    setCartId(data.cart.id);
    return data.cart;
  }

  async function addToCart(variantId, quantity = 1) {
    if (!cartId) await createCart();
    const res = await fetch(`${import.meta.env.PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}/line-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": import.meta.env.PUBLIC_MEDUSA_TOKEN,
      },
      body: JSON.stringify({ variant_id: variantId, quantity }),
    });
    const data = await res.json();
    setCart(data.cart);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


