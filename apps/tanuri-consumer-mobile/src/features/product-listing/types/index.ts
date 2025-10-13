// Types for ProductListing
export type Variant = {
  url: string;
  id: number;
  product: string;
  name: string;
  description: string;
  price: string;
  tradeInPrice: string;
  stockQuantity: number;
  isInStock: boolean;
  images: string;
};

export type Product = {
  url: string;
  id: number;
  category: string;
  name: string;
  description: string;
  variants: Variant[];
};

export type Category = {
  url: string;
  id: number;
  name: string;
  icon: string;
};
