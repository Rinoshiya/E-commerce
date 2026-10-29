export interface ColorOption { name: string; hex: string; }

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  colors: ColorOption[];
  sizes: string[];
  image: string;
  hoverImage: string;
  isNew?: boolean;
}

export interface CartItem { product: Product; qty: number; size?: string; color?: string; }
export interface Category { label: string; slug: string; image: string; }
