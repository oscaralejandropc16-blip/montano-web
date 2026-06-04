import { getSettings, getProducts } from "@/lib/actions";
import HomeClient from "./HomeClient";

export const revalidate = 300;

export default async function Home() {
  const settings = await getSettings();
  const allProducts = await getProducts();
  
  const featuredIds = [
    parseInt(settings.featured_product_1 || '0'),
    parseInt(settings.featured_product_2 || '0'),
    parseInt(settings.featured_product_3 || '0')
  ].filter(id => !isNaN(id) && id > 0);

  let featuredProducts = [];
  if (featuredIds.length > 0) {
    featuredProducts = featuredIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  }
  
  // Rellenar con los más recientes si faltan para llegar a 3
  if (featuredProducts.length < 3) {
    const remaining = 3 - featuredProducts.length;
    const available = allProducts.filter(p => !featuredProducts.some(fp => fp.id === p.id));
    featuredProducts = [...featuredProducts, ...available.slice(0, remaining)];
  }
  
  return (
    <HomeClient settings={settings} featuredProducts={featuredProducts} />
  );
}
