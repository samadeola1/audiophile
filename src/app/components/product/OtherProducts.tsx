import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define the type for the "other" products
type OtherProduct = {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
};

type OtherProductsProps = {
  others: OtherProduct[];
};

// Helper to fix image paths
const getImagePath = (path: string) => path.replace('./assets', '/assets');

const OtherProducts = ({ others }: OtherProductsProps) => {
  return (
    <section className="container mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold uppercase text-center mb-10 md:mb-14">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-4 lg:gap-8">
        {others.map((item) => (
          <div key={item.slug} className="flex flex-col items-center">
            {/* Responsive Image */}
            <div className="relative w-full h-32 md:h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src={getImagePath(item.image.mobile)}
                alt={item.name}
                fill
                className="block md:hidden object-cover"
              />
              <Image
                src={getImagePath(item.image.tablet)}
                alt={item.name}
                fill
                className="hidden md:block lg:hidden object-cover"
              />
              <Image
                src={getImagePath(item.image.desktop)}
                alt={item.name}
                fill
                className="hidden lg:block object-cover"
              />
            </div>
            
            <h3 className="text-2xl font-bold uppercase text-center mb-8">
              {item.name}
            </h3>
            
            <Link
              href={`/product/${item.slug}`}
              className="bg-orange-500 text-white uppercase font-bold text-sm tracking-wider px-8 py-4 hover:bg-orange-600 transition-colors"
            >
              See Product
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherProducts;

