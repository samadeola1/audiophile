import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the type for the product prop
type Product = {
  slug: string;
  name: string;
  new: boolean;
  description: string;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

type ProductCardProps = {
  product: Product;
  isReversed?: boolean; // To control the text/image order
};

const ProductCard = ({ product, isReversed = false }: ProductCardProps) => {
  
  // We need to fix the image paths from the JSON file
  // The JSON has paths like "./assets/..."
  // We need to turn them into "/assets/..."
  const getImagePath = (path: string) => {
    return path.replace('./', '/');
  }

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-32 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      
      {/* Image Column */}
      <div className="relative w-full h-80 lg:h-[560px] lg:flex-1 rounded-lg overflow-hidden">
        <Image
          src={getImagePath(product.categoryImage.mobile)}
          alt={product.name}
          fill
          className="block md:hidden object-cover"
        />
        <Image
          src={getImagePath(product.categoryImage.tablet)}
          alt={product.name}
          fill
          className="hidden md:block lg:hidden object-cover"
        />
        <Image
          src={getImagePath(product.categoryImage.desktop)}
          alt={product.name}
          fill
          className="hidden lg:block object-cover"
        />
      </div>

      {/* Text Column */}
      <div className="flex-1 text-center lg:text-left">
        {product.new && (
          <p className="text-orange-500 uppercase tracking-[0.5em] text-sm mb-4">
            New Product
          </p>
        )}
        <h2 className="text-3xl md:text-4xl font-bold uppercase max-w-md mx-auto lg:mx-0">
          {product.name}
        </h2>
        <p className="text-black text-opacity-50 my-6 md:my-8 max-w-lg mx-auto lg:mx-0">
          {product.description}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-orange-600 transition-colors"
        >
          See Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
