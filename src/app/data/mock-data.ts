import { Category, ColorOption, Product } from '../models/product';

// Placeholder portrait photos. Swap for real assets in /public/images
const photo = (n: number) => `https://picsum.photos/seed/mn${n}/600/800`;

export const CATEGORIES: Category[] = [
  { label: 'Dresses', slug: 'dresses', image: photo(11) },
  { label: 'Abayas', slug: 'abayas', image: photo(12) },
  { label: 'Bags', slug: 'bags', image: photo(13) },
  { label: 'Jewellery', slug: 'jewellery', image: photo(14) },
  { label: 'Shoes', slug: 'shoes', image: photo(15) },
  { label: 'Scarves', slug: 'scarves', image: photo(16) },
];

export const COLORS: ColorOption[] = [
  { name: 'Ink', hex: '#2b1733' },
  { name: 'Berry', hex: '#b5446e' },
  { name: 'Sage', hex: '#6f9a85' },
  { name: 'Sand', hex: '#d8c3a5' },
  { name: 'Ivory', hex: '#f3ece4' },
  { name: 'Navy', hex: '#1f2a52' },
];
const c = (...i: number[]) => i.map(x => COLORS[x]);
const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Satin Slip Midi Dress', category: 'dresses', price: 329, oldPrice: 459, colors: c(1, 0, 2), sizes: SIZES, image: photo(21), hoverImage: photo(22), isNew: true },
  { id: 2, name: 'Pleated Evening Gown', category: 'dresses', price: 589, colors: c(0, 5), sizes: SIZES, image: photo(23), hoverImage: photo(24) },
  { id: 3, name: 'Open Front Crepe Abaya', category: 'abayas', price: 429, colors: c(0, 3, 4), sizes: ['52', '54', '56', '58'], image: photo(25), hoverImage: photo(26), isNew: true },
  { id: 4, name: 'Embroidered Kaftan Abaya', category: 'abayas', price: 699, oldPrice: 849, colors: c(4, 2), sizes: ['52', '54', '56', '58'], image: photo(27), hoverImage: photo(28) },
  { id: 5, name: 'Structured Top-Handle Bag', category: 'bags', price: 379, colors: c(0, 1, 3), sizes: [], image: photo(29), hoverImage: photo(30), isNew: true },
  { id: 6, name: 'Pearl Drop Earrings', category: 'jewellery', price: 119, oldPrice: 159, colors: c(4), sizes: [], image: photo(31), hoverImage: photo(32) },
  { id: 7, name: 'Block Heel Slingbacks', category: 'shoes', price: 289, colors: c(3, 0), sizes: ['36', '37', '38', '39', '40', '41'], image: photo(33), hoverImage: photo(34) },
  { id: 8, name: 'Silk-Blend Printed Scarf', category: 'scarves', price: 149, colors: c(1, 5, 2), sizes: [], image: photo(35), hoverImage: photo(36) },
];
