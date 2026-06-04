import { getSettings, getProducts } from "@/lib/actions";
import HomeClient from "./HomeClient";

export const revalidate = 300;

export default async function Home() {
  const settings = await getSettings();
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 3);
  
  return (
    <HomeClient settings={settings} featuredProducts={featuredProducts} />
  );
}
