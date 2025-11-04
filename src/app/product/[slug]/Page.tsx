import React from 'react';
import fs from 'fs/promises'; // Import the file system module
import path from 'path'; // Import the path module
import Link from 'next/link';
import { notFound } from 'next/navigation'; // For handling 404s

// Import all the new components we will create
import ProductDetails from '../../components/product/ProductDetails';
import ProductFeatures from '../../components/product/ProductFeatures';
import ProductGallery from '../../components/product/ProductGallery';
import OtherProducts from '../../components/product/OtherProducts';

// Import the shared components
import CategoryLinks from '../../components/shared/CategoryLinks';
import BestGear from '../../components/shared/BestGear';

// --- Type Definitions for our JSON data ---
type ImageSet = {
  mobile: string;
  tablet: string;
  desktop: string;
};

type IncludesItem = {
  quantity: number;
  item: string;
};

type Gallery = {
  first: ImageSet;
  second: ImageSet;
  third: ImageSet;
};

type OtherProduct = {
  slug: string;
  name: string;
  image: ImageSet;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  image: ImageSet;
  category: string;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: IncludesItem[];
  gallery: Gallery;
  others: OtherProduct[];
};

// --- Helper Function to Get Data ---
async function getProductData(slug: string): Promise<Product | undefined> {
  // Path to the db.json in your public/assets folder
  const filePath = path.join(process.cwd(), 'public', 'assets', 'db.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    // Find the specific product by its slug
    return data.data.find((item: Product) => item.slug === slug);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return undefined;
  }
}

// --- The Page Component ---
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProductData(slug);

  // If no product is found, show the 404 page
  if (!product) {
    notFound();
  }

  return (
    <div>
      <main className="pt-4 md:pt-8 lg:pt-20">
        <div className="container mx-auto px-6">
          {/* "Go Back" Link */}
          <Link 
            href={`/category/${product.category}`} 
            className="text-black text-opacity-50 font-medium hover:text-orange-500 transition-colors"
          >
            Go Back
          </Link>
        </div>

        {/* 1. Product Details Section (Image, Title, Price, Add to Cart) */}
        <ProductDetails product={product} />

        {/* 2. Features and In the Box Section */}
        <ProductFeatures 
          features={product.features} 
          includes={product.includes} 
        />

        {/* 3. Image Gallery Section */}
        <ProductGallery gallery={product.gallery} />

        {/* 4. "You May Also Like" Section */}
        <OtherProducts others={product.others} />

      </main>

      {/* 5. Shared sections at the bottom */}
      <div className="py-20 md:py-24 lg:py-40 flex flex-col gap-20 md:gap-24 lg:gap-40">
        <CategoryLinks />
        <BestGear />
      </div>
    </div>
  );
}
