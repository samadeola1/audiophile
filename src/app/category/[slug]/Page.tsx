import React from 'react';
import fs from 'fs/promises'; // Import the file system module
import path from 'path'; // Import the path module

// Import components using the correct relative paths
import CategoryHeader from '../../components/category/CategoryHeader';
import ProductCard from '../../components/category/ProductCard';
import CategoryLinks from '../../components/shared/CategoryLinks';
import BestGear from '../../components/shared/BestGear';

// --- Type Definitions for our JSON data ---
type ImageSet = {
  mobile: string;
  tablet: string;
  desktop: string;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  new: boolean;
  price: number;
  description: string;
  categoryImage: ImageSet;
};

// --- Helper Function to Get Data ---
async function getCategoryData(slug: string): Promise<Product[]> {
  // Path to the db.json in your public/assets folder
  const filePath = path.join(process.cwd(), 'public', 'assets', 'db.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    // Filter the data to get only products in this category
    return data.data.filter((item: Product) => item.category === slug);
  } catch (error) {
    console.error("Error reading db.json:", error);
    return []; // Return an empty array on error
  }
}

// --- The Page Component ---
// 1. FIX: Update the type to show params is a Promise
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 2. FIX: Add 'await' here to unwrap the promise
  const { slug } = await params;
  
  // Fetch the data
  const products = await getCategoryData(slug);

  // Sort products, showing new ones first
  const sortedProducts = products.sort((a, b) => (a.new === b.new ? 0 : a.new ? -1 : 1));

  return (
    <div>
      <CategoryHeader categoryName={slug} />

      <main className="py-16 md:py-24 lg:py-40">
        <div className="container mx-auto px-6 flex flex-col gap-24 lg:gap-40">
          {sortedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isReversed={index % 2 !== 0} // Alternate layout
            />
          ))}
        </div>
      </main>

      {/* Shared sections at the bottom */}
      <div className="py-20 md:py-24 lg:py-40 flex flex-col gap-20 md:gap-24 lg:gap-40">
        <CategoryLinks />
        <BestGear />
      </div>
    </div>
  );
}

