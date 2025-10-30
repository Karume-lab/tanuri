// Types for ProductDetail
export type ProductVariant = {
  url: string;
  id: number;
  product: string;
  name: string;
  description: string;
  price: string;
  tradeInPrice: string;
  stockQuantity: number;
  isInStock: boolean;
  images: {
    id: number;
    image: string;
  }[];
};

export type ProductDetail = {
  url: string;
  id: number;
  category: string;
  name: string;
  description: string;
  variants: ProductVariant[];
};

// For variant selection and display
export type VariantDisplayData = {
  name: string;
  variants: {
    id: number;
    name: string;
  }[];
};

export type SelectedVariantInfo = {
  variant: ProductVariant;
  images: string[];
};
