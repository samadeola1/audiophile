"use client";

import React from 'react';
import { useCartStore } from '../../store/cartStore';
import Image from 'next/image';

// Format price utility
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CheckoutSummary = () => {
  const { items, actions } = useCartStore();
  const { getCartTotal } = actions;

  const total = getCartTotal();
  const shipping = 50; // Fixed shipping
  const vat = total * 0.20; // 20% VAT
  const grandTotal = total + shipping; // Per Figma, Grand Total = Total + Shipping

  return (
    <div className="bg-white rounded-lg p-6 md:p-8">
      <h2 className="text-lg font-bold uppercase tracking-wider mb-6">Summary</h2>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.slug} className="flex items-center justify-between gap-4">
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
              <span className="font-bold text-black text-opacity-50">x{item.quantity}</span>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-8 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-black text-opacity-50 uppercase">Total</span>
            <span className="text-lg font-bold">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black text-opacity-50 uppercase">Shipping</span>
            <span className="text-lg font-bold">{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-black text-opacity-50 uppercase">VAT (Included)</span>
            <span className="text-lg font-bold">{formatPrice(vat)}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-black text-opacity-50 uppercase">Grand Total</span>
            <span className="text-lg font-bold text-orange-500">{formatPrice(grandTotal)}</span>
          </div>
        </div>
      )}

      {/* This button submits the form in the *other* component */}
      <button 
        type="submit" 
        form="checkout-form" // This targets the form by its ID
        className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 w-full text-center block hover:bg-orange-600 transition-colors cursor-pointer mt-8"
        disabled={items.length === 0}
      >
        Continue & Pay
      </button>
    </div>
  );
};

export default CheckoutSummary;