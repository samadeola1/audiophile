import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    // The main footer container is black
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        
        {/* Orange line at the top */}
        <div className="w-24 h-1 bg-orange-500 mb-8"></div>

        {/* Top section: Logo and Nav */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
          <div className="text-white text-3xl font-bold tracking-tighter">
            audiophile
          </div>
          <nav className="flex flex-col md:flex-row gap-6 md:gap-8 font-bold text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/category/headphones" className="hover:text-orange-500 transition-colors">Headphones</Link>
            <Link href="/category/speakers" className="hover:text-orange-500 transition-colors">Speakers</Link>
            <Link href="/category/earphones" className="hover:text-orange-500 transition-colors">Earphones</Link>
          </nav>
        </div>

        {/* Middle section: Description */}
        <p className="text-gray-400 my-12 max-w-xl text-center md:text-left">
          Audiophile is the premier all-in-one stop to fulfill your audio needs. We are a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
        </p>

        {/* Bottom section: Copyright and Socials */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 text-center md:text-left">
          <p className="text-gray-400 font-medium">
            Copyright {new Date().getFullYear()}. All Rights Reserved
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#" aria-label="Facebook">
              <Facebook className="hover:text-orange-500 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="hover:text-orange-500 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="hover:text-orange-500 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
