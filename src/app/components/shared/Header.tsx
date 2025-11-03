"use client"; // Add this directive at the very top

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';

// Reusable component for nav links
const NavLinks = ({ onClick }: { onClick?: () => void }) => (
  <>
    <Link href="/" onClick={onClick} className="uppercase font-bold tracking-widest text-black lg:text-gray-800 hover:text-orange-500 transition-colors">Home</Link>
    <Link href="/category/headphones" onClick={onClick} className="uppercase font-bold tracking-widest text-black lg:text-gray-800 hover:text-orange-500 transition-colors">Headphones</Link>
    <Link href="/category/speakers" onClick={onClick} className="uppercase font-bold tracking-widest text-black lg:text-gray-800 hover:text-orange-500 transition-colors">Speakers</Link>
    <Link href="/category/earphones" onClick={onClick} className="uppercase font-bold tracking-widest text-black lg:text-gray-800 hover:text-orange-500 transition-colors">Earphones</Link>
  </>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // This will be the layout for the Homepage Hero
  // On other pages, we can make it sticky or relative with a white bg
  const isHomepage = true; // We can make this dynamic later with usePathname()

  return (
    <>
      <header className={`
        ${isHomepage ? 'absolute top-0 left-0 lg:bg-transparent' : 'relative bg-black'} 
        w-full z-30
      `}>
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
          {/* On homepage, logo is text-white, on others, text-black */}
          <Link href="/" className={`
            text-2xl font-bold tracking-tighter 
            ${isHomepage ? 'text-white' : 'text-white'}
            lg:mr-12 lg:text-black
            ${isHomepage && 'lg:text-white'} 
          `}>
            audiophile
          </Link>

          {/* Desktop Nav (hidden on mobile/tablet) */}
          <nav className="hidden lg:flex pl-[230px] gap-8 font-bold text-sm">
            {/* We need to pass different styles to NavLinks for desktop */}
            <Link href="/" className="uppercase font-bold tracking-widest text-white hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/category/headphones" className="uppercase font-bold tracking-widest text-white hover:text-orange-500 transition-colors">Headphones</Link>
            <Link href="/category/speakers" className="uppercase font-bold tracking-widest text-white hover:text-orange-500 transition-colors">Speakers</Link>
            <Link href="/category/earphones" className="uppercase font-bold tracking-widest text-white hover:text-orange-500 transition-colors">Earphones</Link>
          </nav>

          {/* Cart Icon */}
          <button 
            className={`
              ml-auto 
              ${isHomepage ? 'text-white' : 'text-white'}
              ${isHomepage && 'lg:text-white'}
            `} 
            aria-label="View cart"
          >
            <ShoppingCart size={24} />
          </button>
        </div>
        {/* Bottom border */}
        <div className="container mx-auto px-6">
          <div className="border-b border-gray-700 opacity-50"></div>
        </div>
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
            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-6 mt-16">
              <NavLinks onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

