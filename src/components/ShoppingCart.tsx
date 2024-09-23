import React from 'react';
import { CartItem } from '../utils/types';

interface ShoppingCartProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, removeFromCart, updateQuantity }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className='text-black'>Your cart is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
          {cartItems.map((item) => (
            <li key={item.id} className="flex flex-col border border-gray-300 p-4"> 
              <div className="flex justify-between items-center text-black">
                <div>
                
                  <span className="font-semibold">{item.name}</span>
                  <span className="block">{item.price} {item.currency}</span>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="border border-gray-400 p-1 w-16 text-center"
                  />
                  <button
                    className="bg-red-500 text-white ml-4 px-2 rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
