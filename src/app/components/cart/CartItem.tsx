"use client";

import React from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
// 1. FIX: Rename the imported type to "CartItemType" to avoid a name clash
import { CartItem as CartItemType } from '../../types'; 
import { useCartStore } from '../../store/cartStore';

// Format price utility
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// 2. The component is named "CartItem"
const CartItem = ({ item }: { item: CartItemType }) => { // 3. Use the new type name "CartItemType" here
  // FIX: Select the action individually to prevent errors
  const updateQuantity = useCartStore((state) => state.actions.updateQuantity);

  const increment = () => {
    updateQuantity(item.slug, item.quantity + 1);
  };
  
  const decrement = () => {
    updateQuantity(item.slug, item.quantity - 1);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-black text-opacity-50 font-bold">{formatPrice(item.price)}</p>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="bg-gray-100 flex items-center justify-between w-24 px-3 py-2">
        <button onClick={decrement} className="text-black text-opacity-25 hover:text-orange-500 transition-colors">
          <Minus size={14} />
        </button>
        <span className="font-bold text-sm">{item.quantity}</span>
        <button onClick={increment} className="text-black text-opacity-25 hover:text-orange-500 transition-colors">
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;