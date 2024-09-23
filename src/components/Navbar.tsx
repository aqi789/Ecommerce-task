import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa'; 

interface NavbarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filters: {
      gender: string;
      color: string;
      priceRange: [number, number];
    };
    setFilters: React.Dispatch<React.SetStateAction<{ gender: string; color: string; priceRange: [number, number] }>>;
  }
  const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, filters, setFilters }) => {
    return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl">T-Shirt Shop</h1>
      </Link>
      <Link href="/cart">
        <span className="material-icons"><FaShoppingCart  size={20}/></span>
      </Link>
    </nav>
  );
};

export default Navbar;
