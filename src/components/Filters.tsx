import React, { useState } from 'react';
import { catalogue } from '../utils/catalogue'; 
import ProductCard from './ProductCard';

interface Filters {
  gender: string[];
  color: string[];
}

const Filters = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    gender: [],
    color: [],
  });

  const handleGenderChange = (value: string) => {
    setFilters(prevFilters => {
      const updatedGender = prevFilters.gender.includes(value)
        ? prevFilters.gender.filter(g => g !== value)
        : [...prevFilters.gender, value];
      return { ...prevFilters, gender: updatedGender };
    });
  };

  const handleColorChange = (value: string) => {
    setFilters(prevFilters => {
      const updatedColor = prevFilters.color.includes(value)
        ? prevFilters.color.filter(c => c !== value)
        : [...prevFilters.color, value];
      return { ...prevFilters, color: updatedColor };
    });
  };

  const filteredProducts = catalogue.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = filters.gender.length === 0 || filters.gender.includes(product.gender);
    const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
    return matchesSearch && matchesGender && matchesColor;
  });

  return (
    <div className="flex flex-col mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 text-black mb-4"
      />
      <div className="flex flex-col mb-2">
        <h3 className="font-semibold text-black">Gender</h3>
        <label className="text-black">
          <input
            type="checkbox"
            checked={filters.gender.includes("Men")}
            onChange={() => handleGenderChange("Men")}
          />
          Men
        </label>
        <label className="text-black">
          <input
            type="checkbox"
            checked={filters.gender.includes("Women")}
            onChange={() => handleGenderChange("Women")}
          />
          Women
        </label>
      </div>
      <div className="flex flex-col mb-2">
        <h3 className="font-semibold text-black">Color</h3>
        {["Black", "White", "Blue", "Red", "Green", "Pink", "Grey", "Purple", "Yellow"].map(color => (
          <label className="text-black" key={color}>
            <input
              type="checkbox"
              checked={filters.color.includes(color)}
              onChange={() => handleColorChange(color)}
            />
            {color}
          </label>
        ))}
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} cartItems={[]} setCartItems={() => {}} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Filters;
