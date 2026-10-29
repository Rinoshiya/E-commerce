import { Category, ColorOption, Product } from '../models/product';

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

const productPhotos = {
  satinSlipMidiDress: [photo('1539109136881-3be0616acf4b'), photo('1490481651871-ab68de25d43d')],
  pleatedEveningGown: [photo('1529139574466-a303027c1d8b'), photo('1539109136881-3be0616acf4b')],
  openFrontCrepeAbaya: [photo('1525507119028-ed4c629a60a3'), photo('1551232864-3f0890e580d9')],
  embroideredKaftanAbaya: [photo('1551232864-3f0890e580d9'), photo('1525507119028-ed4c629a60a3')],
  structuredTopHandleBag: [photo('1584917865442-de89df76afd3'), photo('1584917865442-de89df76afd3')],
  pearlDropEarrings: [photo('1535632066927-ab7c9ab60908'), photo('1606760227091-3dd870d97f1d')],
  blockHeelSlingbacks: [photo('1543163521-1bf539c55dd2'), photo('1543163521-1bf539c55dd2')],
  silkBlendPrintedScarf: [photo('1601924994987-69e26d50dc26'), photo('1601924994987-69e26d50dc26')],
};

export const CATEGORIES: Category[] = [
  { label: 'Dresses', slug: 'dresses', image: productPhotos.satinSlipMidiDress[0] },
  { label: 'Abayas', slug: 'abayas', image: productPhotos.openFrontCrepeAbaya[0] },
  { label: 'Bags', slug: 'bags', image: productPhotos.structuredTopHandleBag[0] },
  { label: 'Jewellery', slug: 'jewellery', image: productPhotos.pearlDropEarrings[0] },
  { label: 'Shoes', slug: 'shoes', image: productPhotos.blockHeelSlingbacks[0] },
  { label: 'Scarves', slug: 'scarves', image: productPhotos.silkBlendPrintedScarf[0] },
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
  { id: 1, name: 'Satin Slip Midi Dress', category: 'dresses', price: 329, oldPrice: 459, colors: c(1, 0, 2), sizes: SIZES, image: productPhotos.satinSlipMidiDress[0], hoverImage: productPhotos.satinSlipMidiDress[1], isNew: true },
  { id: 2, name: 'Pleated Evening Gown', category: 'dresses', price: 589, colors: c(0, 5), sizes: SIZES, image: productPhotos.pleatedEveningGown[0], hoverImage: productPhotos.pleatedEveningGown[1] },
  { id: 3, name: 'Open Front Crepe Abaya', category: 'abayas', price: 429, colors: c(0, 3, 4), sizes: ['52', '54', '56', '58'], image: productPhotos.openFrontCrepeAbaya[0], hoverImage: productPhotos.openFrontCrepeAbaya[1], isNew: true },
  { id: 4, name: 'Embroidered Kaftan Abaya', category: 'abayas', price: 699, oldPrice: 849, colors: c(4, 2), sizes: ['52', '54', '56', '58'], image: productPhotos.embroideredKaftanAbaya[0], hoverImage: productPhotos.embroideredKaftanAbaya[1] },
  { id: 5, name: 'Structured Top-Handle Bag', category: 'bags', price: 379, colors: c(0, 1, 3), sizes: [], image: productPhotos.structuredTopHandleBag[0], hoverImage: productPhotos.structuredTopHandleBag[1], isNew: true },
  { id: 6, name: 'Pearl Drop Earrings', category: 'jewellery', price: 119, oldPrice: 159, colors: c(4), sizes: [], image: productPhotos.pearlDropEarrings[0], hoverImage: productPhotos.pearlDropEarrings[1] },
  { id: 7, name: 'Block Heel Slingbacks', category: 'shoes', price: 289, colors: c(3, 0), sizes: ['36', '37', '38', '39', '40', '41'], image: productPhotos.blockHeelSlingbacks[0], hoverImage: productPhotos.blockHeelSlingbacks[1] },
  { id: 8, name: 'Silk-Blend Printed Scarf', category: 'scarves', price: 149, colors: c(1, 5, 2), sizes: [], image: productPhotos.silkBlendPrintedScarf[0], hoverImage: productPhotos.silkBlendPrintedScarf[1] },
];
