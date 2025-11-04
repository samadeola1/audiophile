import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// This is a reusable card component
const CategoryCard = ({ src, name, href }: { src: string, name: string, href: string }) => (
  <Link href={href} className="relative flex-1 bg-gray-100 rounded-lg pt-20 pb-5 text-center flex flex-col items-center group">
    {/* Use a container div for sizing */}
    <div className="absolute -top-14 w-40 h-36">
      <Image
        src={src}
        alt={name}
        width={160} // Provide explicit width
        height={144} // Provide explicit height
        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h3 className="font-bold uppercase tracking-wider">{name}</h3>
    <div className="flex items-center justify-center mt-3 text-sm text-black text-opacity-50 group-hover:text-orange-500 transition-colors">
      <span>SHOP</span>
      <ChevronRight size={16} className="text-orange-500 ml-1" />
    </div>
  </Link>
);

const CategoryLinks = ({ className = '' }: { className?: string }) => {
  return (
    <section className={`container mx-auto px-6 ${className}`}>
      <div className="flex flex-col md:flex-row gap-16 md:gap-4 lg:gap-8 pt-14">
        <CategoryCard 
          name="Headphones" 
          href="/category/headphones" 
          src="/assets/shared/desktop/image-category-thumbnail-headphones.png" 
        />
        <CategoryCard 
          name="Speakers" 
          href="/category/speakers" 
          src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
        />
        <CategoryCard 
          name="Earphones" 
          href="/category/earphones" 
          src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
        />
      </div>
    </section>
  );
};

export default CategoryLinks;

