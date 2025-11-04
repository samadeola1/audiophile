import React from 'react';
import Image from 'next/image';

type ImageSet = {
  mobile: string;
  tablet: string;
  desktop: string;
};

type Gallery = {
  first: ImageSet;
  second: ImageSet;
  third: ImageSet;
};

type ProductGalleryProps = {
  gallery: Gallery;
};

// Helper to fix image paths
const getImagePath = (path: string) => path.replace('./assets', '/assets');

const GalleryImage = ({ name, images }: { name: string, images: ImageSet }) => (
  <div className="relative w-full h-full rounded-lg overflow-hidden">
    <Image
      src={getImagePath(images.mobile)}
      alt={`Gallery image ${name} mobile`}
      fill
      className="block md:hidden object-cover"
    />
    <Image
      src={getImagePath(images.tablet)}
      alt={`Gallery image ${name} tablet`}
      fill
      className="hidden md:block lg:hidden object-cover"
    />
    <Image
      src={getImagePath(images.desktop)}
      alt={`Gallery image ${name} desktop`}
      fill
      className="hidden lg:block object-cover"
    />
  </div>
);

const ProductGallery = ({ gallery }: ProductGalleryProps) => {
  return (
    <section className="container mx-auto px-6 my-16 md:my-24 lg:my-40">
      {/* Gallery Layout:
        - Mobile: 3 rows (1-1-1)
        - Tablet: 2 columns (1-2 grid)
        - Desktop: 2 columns (1-2 grid)
      */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        
        {/* First Image (Small) */}
        <div className="md:col-span-2 h-44 md:h-72 lg:h-auto lg:row-span-1">
          <GalleryImage name="first" images={gallery.first} />
        </div>

        {/* Second Image (Small) */}
        <div className="md:col-span-2 h-44 md:h-72 lg:h-auto lg:row-span-1">
          <GalleryImage name="second" images={gallery.second} />
        </div>

        {/* Third Image (Large) */}
        <div className="md:col-span-3 md:row-span-2 h-96 md:h-auto">
          <GalleryImage name="third" images={gallery.third} />
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;

