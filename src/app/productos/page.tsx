import { getProducts, getCategories, getBrands, getSettings } from "@/lib/actions";
import CatalogClient from "./CatalogClient";

export const revalidate = 300; // Para que el catálogo esté siempre fresco al refrescar

export default async function ProductosPage() {
  const catalog = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();
  const settings = await getSettings();
  return <CatalogClient catalog={catalog} dbCategories={categories} dbBrands={brands} settings={settings} />;
}
