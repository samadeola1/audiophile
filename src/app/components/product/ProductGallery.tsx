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
      {/* FIXED LAYOUT:
        - Mobile: 3 rows (default grid-cols-1, gap-4)
        - Tablet/Desktop: A 5-column grid (md:grid-cols-5)
      */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
        
        {/* --- LEFT COLUMN --- */}
        {/* This column holds the two smaller images. It spans 2 of 5 grid columns */}
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-6 lg:gap-8">
          {/* First Image (Small) */}
          <div className="relative h-44 md:h-[174px] lg:h-[280px] w-full">
            <GalleryImage name="first" images={gallery.first} />
          </div>
          {/* Second Image (Small) */}
          <div className="relative h-44 md:h-[174px] lg:h-[280px] w-full">
            <GalleryImage name="second" images={gallery.second} />
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        {/* This column holds the single large image. It spans 3 of 5 grid columns */}
        <div className="md:col-span-3 relative h-96 md:h-[368px] lg:h-[592px] w-full">
          <GalleryImage name="third" images={gallery.third} />
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;

