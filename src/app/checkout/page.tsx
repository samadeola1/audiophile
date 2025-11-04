"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import ConfirmationModal from '../components/checkout/ConfirmationModal';
import { useCartStore } from '../store/cartStore';

const CheckoutPage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // --- THIS IS THE FIX ---
  // We must select each piece of state individually
  // to prevent the infinite loop error.
  const items = useCartStore((state) => state.items);
  const isConfirmationModalOpen = useCartStore((state) => state.isConfirmationModalOpen);
  // --- END OF FIX ---

  useEffect(() => {
    setIsClient(true);
    // Add a fallback `|| []` in case `items` is undefined during hydration
    if ((items || []).length === 0 && !isConfirmationModalOpen) {
      router.push('/');
    }
  }, [items, isConfirmationModalOpen, router]);

  // Add the same fallback here
  if (!isClient || ((items || []).length === 0 && !isConfirmationModalOpen)) {
    return (
      <div className="bg-gray-100 min-h-screen"></div> // Loader
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6 pt-8 pb-24">
        <Link 
          href="/" 
          className="text-black text-opacity-50 font-medium hover:text-orange-500 transition-colors my-8 block"
        >
          Go Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-grow bg-white rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-8">Checkout</h1>
            <CheckoutForm />
          </div>

          {/* Summary */}
          <div className="lg:w-96 lg:sticky lg:top-8">
            <CheckoutSummary />
          </div>
        </div>
      </div>
      
      {/* Show confirmation modal when state is true */}
      {isConfirmationModalOpen && <ConfirmationModal />}
    </div>
  );
};

export default CheckoutPage;

