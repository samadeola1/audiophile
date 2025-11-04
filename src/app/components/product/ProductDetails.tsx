"use client"; // This is a client component because it uses state for the counter

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

// Define the type for the product prop
type Product = {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
};

// Helper to fix image paths
const getImagePath = (path: string) => path.replace('./assets', '/assets');

const ProductDetails = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <section className="container mx-auto px-6 my-16 md:my-24 lg:my-40">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-32">
        
        {/* Image Column */}
        <div className="relative w-full h-80 md:h-96 lg:h-[560px] md:flex-1 rounded-lg overflow-hidden">
          <Image
            src={getImagePath(product.image.mobile)}
            alt={product.name}
            fill
            className="block md:hidden object-cover"
          />
          <Image
            src={getImagePath(product.image.tablet)}
            alt={product.name}
            fill
            className="hidden md:block lg:hidden object-cover"
          />
          <Image
            src={getImagePath(product.image.desktop)}
            alt={product.name}
            fill
            className="hidden lg:block object-cover"
          />
        </div>

        {/* Text Column */}
        <div className="md:flex-1 text-left">
          {product.new && (
            <p className="text-orange-500 uppercase tracking-[0.5em] text-sm mb-4">
              New Product
            </p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold uppercase max-w-md">
            {product.name}
          </h1>
          <p className="text-black text-opacity-50 my-6 md:my-8 max-w-lg leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-bold tracking-wider mb-8">
            {formattedPrice}
          </p>

          {/* Add to Cart Controls */}
          <div className="flex gap-4">
            {/* Quantity Selector */}
            <div className="bg-gray-100 flex items-center justify-between w-32 px-4 py-3">
              <button onClick={decrement} className="text-black text-opacity-25 hover:text-orange-500 transition-colors">
                <Minus size={16} />
              </button>
              <span className="font-bold">{quantity}</span>
              <button onClick={increment} className="text-black text-opacity-25 hover:text-orange-500 transition-colors">
                <Plus size={16} />
              </button>
            </div>
            {/* Add to Cart Button */}
            <button
              className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

