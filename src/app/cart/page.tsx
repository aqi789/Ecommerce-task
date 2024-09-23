"use client";
import { useState } from 'react';
import Navbar from '../../components/Navbar'; 
import ShoppingCart from '../../components/ShoppingCart';
import { CartItem } from '../../utils/types'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [filters, setFilters] = useState<{
    gender: string[]; 
    color: string[]; 
    priceRange: [number, number]; 
  }>({
    gender: [],
    color: [],
    priceRange: [0, 100] 
  });

  const removeFromCart = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  return (
    <div>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        filters={filters} 
        setFilters={setFilters} 
      />
      <h1 className="text-xl text-black m-4">Shopping Cart</h1>
      <div className='w-full'>
        <ShoppingCart 
          cartItems={cartItems} 
          removeFromCart={removeFromCart} 
          updateQuantity={updateQuantity} 
        />
      </div>
    </div>
  );
};

export default Cart;
