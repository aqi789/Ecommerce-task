import React, { useState } from "react";
import { Product } from "../utils/types"; 
import Image from 'next/image';

interface ProductCardProps {
  product: Product; 
  cartItems: Product[]; 
  setCartItems: (items: Product[]) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartItems, setCartItems }) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleAddToCart = (quantity: number) => {
    if (quantity > product.quantity) {
      setMessage(`Cannot add more than ${product.quantity} items of ${product.name}`);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } else {
      const updatedCart = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    setMessage(`Added ${quantity} of ${product.name} to the cart.`);
  };

  return (
    <div className="m-4 border border-gray-400 rounded-md shadow-sm p-4 flex flex-col items-center w-full max-w-xs"> 
      <Image 
        src="/images/product.webp" 
        alt="Product Image"
        width={200}
        height={200}
      />
      <h2 className="text-lg font-semibold text-black">{product.name}</h2>
      <p className="text-gray-600">{product.price} {product.currency}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={() => handleAddToCart(1)}
      >
        Add to Cart
      </button>
      {message && <p className="mt-2 text-green-500">{message}</p>} 
    </div>
  );
};

export default ProductCard;
