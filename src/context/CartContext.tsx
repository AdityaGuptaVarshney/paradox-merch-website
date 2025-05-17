import React, { createContext, useContext, useState, useEffect } from 'react';

interface BaseCartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  quantity: number;
}

interface ProductCartItem extends BaseCartItem {
  type: 'product';
  size: string;
}

interface ExperienceCartItem extends BaseCartItem {
  type: 'experience';
  startTime: string;
  duration: string;
}

type CartItem = ProductCartItem | ExperienceCartItem;

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string, identifier: string) => void;
  updateQuantity: (itemId: string, identifier: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => {
          if (item.type === 'product' && newItem.type === 'product') {
            return item.id === newItem.id && item.size === newItem.size;
          }
          if (item.type === 'experience' && newItem.type === 'experience') {
            return item.id === newItem.id && item.startTime === newItem.startTime;
          }
          return false;
        }
      );

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      // Add new item if it doesn't exist
      return [...currentItems, newItem];
    });
  };

  const removeFromCart = (itemId: string, identifier: string) => {
    setItems(currentItems =>
      currentItems.filter(item => {
        if (item.type === 'product') {
          return !(item.id === itemId && item.size === identifier);
        }
        return !(item.id === itemId && item.startTime === identifier);
      })
    );
  };

  const updateQuantity = (itemId: string, identifier: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item => {
        if (item.type === 'product') {
          return item.id === itemId && item.size === identifier
            ? { ...item, quantity }
            : item;
        }
        return item.id === itemId && item.startTime === identifier
          ? { ...item, quantity }
          : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 