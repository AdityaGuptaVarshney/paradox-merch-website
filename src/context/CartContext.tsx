import React, { createContext, useContext, useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

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
  addToCart: (item: CartItem, variantId?: string) => void;
  removeFromCart: (itemId: string, identifier: string) => void;
  updateQuantity: (itemId: string, identifier: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  loading: boolean;
}

const CART_PRODUCT_CREATE = gql`
  mutation CartProductCreate($input: CreateCartProductInput!) {
    CartProductCreate(input: $input) {
      id
      createdAt
      updatedAt
      userID
      productID
      productCode
      quantity
      variantName
      variantID
      toDeliver
      product {
        id
        createdAt
        updatedAt
        code
        name
        shortDescription
        longDescription
        price
        isDeliverable
        category
      }
      variant {
        variant
      }
    }
  }
`;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Get auth token from localStorage for Apollo client
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  console.log(authToken);
  
  const [createCartProduct, { loading }] = useMutation(CART_PRODUCT_CREATE, {
    context: {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` :'Bearer null'
      }
    }
  });

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

  const addToCart = async (newItem: CartItem, variantId?: string) => {
    // First update the local cart state
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
    
    // Then send to backend if it's a product
    if (newItem.type === 'product') {
      try {
        // Get member data from localStorage
        const memberDataStr = localStorage.getItem('memberData');
        const currentAuthToken = localStorage.getItem('authToken');
        
        if (memberDataStr && currentAuthToken) {
          const memberData = JSON.parse(memberDataStr);
          const userId = memberData.id;
          
          if (userId) {
            await createCartProduct({
              variables: {
                input: {
                  productID: newItem.id,
                  productCode: newItem.id, // Using ID as code if not available
                  quantity: newItem.quantity,
                  userID: userId,
                  variantID: variantId || '',
                  variantName: newItem.size,
                  toDeliver: true,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                }
              },
              context: {
                headers: {
                  Authorization: `Bearer ${currentAuthToken}` || 'Bearer null'
                }
              }
            });
            console.log('Item added to cart in backend for user:', memberData.email);
          } else {
            console.log('User ID not found in member data');
          }
        } else {
          console.log('User not logged in, only updating local cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
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
        loading
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