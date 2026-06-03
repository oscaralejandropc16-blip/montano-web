import { getProducts, getCategories, getBrands } from "@/lib/actions";
import CatalogClient from "./CatalogClient";

export const revalidate = 0; // Para que el catálogo esté siempre fresco al refrescar

export default async function ProductosPage() {
  const catalog = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();
  return <CatalogClient catalog={catalog} dbCategories={categories} dbBrands={brands} />;
}
