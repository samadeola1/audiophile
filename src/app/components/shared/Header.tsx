"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCartStore } from '../../store/cartStore'; // Import Zustand store
import CartModal from '../cart/CartModal'; // Import the new Cart Modal

// Reusable component for nav links
const NavLinks = ({ onClick, className = '' }: { onClick?: () => void, className?: string }) => (
  <>
    <Link href="/" onClick={onClick} className={`uppercase font-bold tracking-widest hover:text-orange-500 transition-colors ${className}`}>Home</Link>
    <Link href="/category/headphones" onClick={onClick} className={`uppercase font-bold tracking-widest hover:text-orange-500 transition-colors ${className}`}>Headphones</Link>
    <Link href="/category/speakers" onClick={onClick} className={`uppercase font-bold tracking-widest hover:text-orange-500 transition-colors ${className}`}>Speakers</Link>
    <Link href="/category/earphones" onClick={onClick} className={`uppercase font-bold tracking-widest hover:text-orange-500 transition-colors ${className}`}>Earphones</Link>
  </>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  // --- FIX FOR ALL ERRORS ---
  // 1. Select state individually to prevent infinite loops
  const items = useCartStore((state) => state.items);
  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const toggleCartModal = useCartStore((state) => state.actions.toggleCartModal);

  // 2. Use 'isMounted' to track if we are on the client
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. Add a fallback `|| []` for items, which can be undefined on initial load
  const totalItems = (items || []).reduce((total, item) => total + item.quantity, 0);
  // --- END OF FIX ---

  const headerClasses = isHomepage
    ? 'absolute bg-transparent text-white'
    : 'relative bg-black text-white';
  
  const navLinkClasses = 'text-white';

  return (
    <>
      <header className={`top-0 left-0 w-full z-30 ${headerClasses}`}>
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="text-2xl font-bold px-20 lg:px-0 tracking-tighter text-white lg:mr-12">
            audiophile
          </Link>

          <nav className="hidden lg:flex px-60 gap-8 font-bold text-sm">
            <NavLinks className={navLinkClasses} />
          </nav>

          {/* Cart Icon */}
          <button 
            onClick={toggleCartModal}
            className="ml-auto text-white relative" 
            // 4. Use 'isMounted' to conditionally render the total for hydration safety
            aria-label={`View cart (${isMounted ? totalItems : 0} items)`}
          >
            <ShoppingCart size={24} />
            {/* 5. Use 'isMounted' to conditionally render the badge */}
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        
        {isHomepage && (
          <div className="container mx-auto px-6">
            <div className="border-b border-gray-700 opacity-50"></div>
          </div>
        )}
      </header>

      {/* Mobile Menu (Overlay) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white z-50 p-8 shadow-lg animate__animated animate__slideInLeft animate__faster"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-500"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-6 mt-16">
              <NavLinks onClick={() => setIsMobileMenuOpen(false)} className="text-black" />
            </nav>
          </div>
        </div>
      )}

      {/* 6. Use 'isMounted' to only render the modal on the client */}
      {isMounted && <CartModal />}
    </>
  );
};

export default Header;

