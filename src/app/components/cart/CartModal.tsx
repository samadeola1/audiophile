"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import CartItem from './CartItem'; // FIXED: This import now matches the file

// Format price utility
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CartModal = () => {
  // FIX: Select state individually
  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const items = useCartStore((state) => state.items);
  const { toggleCartModal, clearCart, getCartTotal } = useCartStore((state) => state.actions);
  
  const cartItems = items || []; // Fallback for hydration
  const total = getCartTotal();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isCartModalOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black/50 z-40" 
      onClick={toggleCartModal}
    >
      {/* Modal Content */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm md:right-10 md:left-auto md:-translate-x-0 lg:right-40"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="bg-white rounded-lg p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider">
              Cart ({cartItems.length})
            </h2>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-black text-opacity-50 underline hover:text-orange-500"
              >
                Remove all
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItem key={item.slug} item={item} />
                ))}
              </div>
              <div className="flex justify-between items-center my-6">
                <span className="text-black text-opacity-50 uppercase">Total</span>
                <span className="text-lg font-bold">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={toggleCartModal} // Close modal on click
                className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 w-full text-center block hover:bg-orange-600 transition-colors"
              >
                Checkout
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;