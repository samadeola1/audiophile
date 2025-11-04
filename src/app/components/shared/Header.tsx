"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Import the usePathname hook

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
  const pathname = usePathname(); // Get the current URL path
  const isHomepage = pathname === '/'; // Check if we are on the homepage

  // Determine classes based on the page
  const headerClasses = isHomepage
    ? 'absolute bg-transparent text-white'
    : 'relative bg-black text-white';
  
  const navLinkClasses = isHomepage ? 'text-white' : 'text-white'; // Desktop links are always white on dark bg

  return (
    <>
      <header className={`top-0 left-0 w-full z-30 ${headerClasses}`}>
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle (hidden on lg) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white lg:mr-12">
            audiophile
          </Link>

          {/* Desktop Nav (hidden on mobile/tablet) */}
          <nav className="hidden lg:flex pl-[100px] gap-8 font-bold text-sm">
            <NavLinks className={navLinkClasses} />
          </nav>

          {/* Cart Icon */}
          <button 
            className="ml-auto text-white" 
            aria-label="View cart"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
        {/* Bottom border (only show on homepage) */}
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
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-500"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {/* Mobile Nav Links - now text-black */}
            <nav className="flex flex-col gap-6 mt-16">
              <NavLinks onClick={() => setIsMobileMenuOpen(false)} className="text-black" />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;