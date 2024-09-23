"use client";
import { useState } from "react";
import { catalogue } from "../../utils/catalogue";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import { Product } from "../../utils/types"; 
import ShoppingCart from "../../components/ShoppingCart";

const Home = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    gender: string;
    color: string;
    priceRange: [number, number];
  }>({
    gender: "",
    color: "",
    priceRange: [0, 100],
  });

  const addToCart = (product: Product, quantity: number) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedItems);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCart);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const filteredProducts = catalogue.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGender = !filters.gender || product.gender === filters.gender;
    const matchesColor = !filters.color || product.color === filters.color;
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return matchesSearch && matchesGender && matchesColor && matchesPrice;
  });

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="flex p-4">
        <div className="flex justify-between">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartItems={cartItems} 
                setCartItems={setCartItems} 
              />
            ))
          ) : (
            <p className="text-black text-center col-span-3">No products found.</p>
          )}
        </div>
        <div className="w-1/4 p-4">
          <ShoppingCart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
