"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../types';

// Format price utility
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ConfirmationModal = () => {
  // --- FIX #1: Select state individually to prevent infinite loops ---
  const items = useCartStore((state) => state.items);
  // We can select multiple actions at once, this is safe
  const { getCartTotal, toggleConfirmationModal, clearConfirmedOrder } = useCartStore((state) => state.actions);
  
  // We "snapshot" the cart state *before* it's cleared
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  useEffect(() => {
    // When the modal opens, capture the current cart state
    // We add `|| []` as a fallback in case `items` is undefined during hydration
    setConfirmedItems(items || []); 
    setConfirmedTotal(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs only once when the modal is mounted

  const firstItem = confirmedItems[0];
  const otherItemCount = confirmedItems.length - 1;
  const shipping = 50;
  const grandTotal = confirmedTotal + shipping;

  return (
    // --- FIX #2: Use Tailwind v4 syntax `bg-black/50` ---
    <div 
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-6" 
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg p-8 md:p-12 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image 
          src="/assets/checkout/icon-order-confirmation.svg" 
          alt="Order confirmed" 
          width={64} 
          height={64} 
          className="mb-6"
        />
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider leading-tight">
          Thank you<br/>for your order
        </h2>
        <p className="text-black text-opacity-50 my-6">
          You will receive an email confirmation shortly.
        </p>

        {firstItem && (
          <div className="rounded-lg overflow-hidden flex flex-col md:flex-row mb-8">
            {/* Item List */}
            <div className="flex-1 bg-gray-100 p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={firstItem.image}
                      alt={firstItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{firstItem.name}</p>
                    <p className="text-black text-opacity-50 font-bold">{formatPrice(firstItem.price)}</p>
                  </div>
                </div>
                <span className="font-bold text-black text-opacity-50">x{firstItem.quantity}</span>
              </div>
              {otherItemCount > 0 && (
                <div className="text-center pt-4 mt-4 border-t border-gray-300">
                  <p className="text-xs font-bold text-black text-opacity-50">
                    and {otherItemCount} other item(s)
                  </p>
                </div>
              )}
            </div>
            {/* Grand Total */}
            <div className="bg-black text-white p-6 md:w-48 flex flex-col justify-center">
              <span className="text-white text-opacity-50 uppercase text-sm mb-2">Grand Total</span>
              <span className="text-lg font-bold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        )}
        
        <Link
          href="/"
          onClick={() => {
            clearConfirmedOrder(); // Empty the cart
            toggleConfirmationModal(); // Close the modal
          }}
          className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 w-full text-center block hover:bg-orange-600 transition-colors"
        >
          Back to home
        </Link>

      </div>
    </div>
  );
};

export default ConfirmationModal;

