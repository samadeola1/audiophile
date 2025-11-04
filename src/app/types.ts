// A central place for all our data types

export type ImageSet = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export type IncludesItem = {
  quantity: number;
  item: string;
};

export type Gallery = {
  first: ImageSet;
  second: ImageSet;
  third: ImageSet;
};

export type OtherProduct = {
  slug: string;
  name: string;
  image: ImageSet;
};

// This is the FULL product type from db.json
export type Product = {
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

// This is the item as it will be stored in our cart
export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string; // We'll just store one image for the cart
  quantity: number;
};
