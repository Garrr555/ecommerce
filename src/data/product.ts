export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: number[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Aero Runner",
    category: "Running",
    price: 899000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description:
      "Sepatu running ringan dengan cushioning responsif untuk aktivitas sehari-hari.",
    sizes: [39, 40, 41, 42, 43],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Urban Street",
    category: "Lifestyle",
    price: 749000,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    description:
      "Sneakers lifestyle dengan desain clean yang cocok digunakan sehari-hari.",
    sizes: [39, 40, 41, 42, 43],
  },
  {
    id: 3,
    name: "Cloud Walker",
    category: "Running",
    price: 999000,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    description:
      "Kenyamanan maksimal dengan konstruksi breathable dan lightweight.",
    sizes: [40, 41, 42, 43, 44],
    badge: "New",
  },
  {
    id: 4,
    name: "Classic Low",
    category: "Casual",
    price: 649000,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    description:
      "Sepatu casual klasik dengan desain timeless untuk berbagai outfit.",
    sizes: [39, 40, 41, 42, 43],
  },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};
